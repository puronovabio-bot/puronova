import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';
import sendEmail from '../utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const getRazorpay = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const razorpay = getRazorpay();
    
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: orderId,
      notes: { orderId },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update order with razorpay order id
    await Order.findByIdAndUpdate(orderId, { razorpayOrderId: razorpayOrder.id });

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify payment
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        orderStatus: 'confirmed',
        $push: { statusHistory: { status: 'confirmed', note: 'Payment verified' } },
      }, { new: true }).populate('user', 'name email');

      const emailContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #1a5336; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">PURO NOVA</h1>
            <p style="color: #a0d8ba; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Payment Successful</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Order Confirmed!</h2>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Dear <strong>${updatedOrder.user.name}</strong>,</p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Great news! We have successfully received your payment. Your order is now confirmed and being processed.</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #1a5336;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #718096; font-size: 14px;">Order Number:</td>
                  <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 600; text-align: right;">${updatedOrder.orderNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096; font-size: 14px;">Total Amount:</td>
                  <td style="padding: 8px 0; color: #1a5336; font-size: 18px; font-weight: 700; text-align: right;">₹${updatedOrder.total}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">We'll send you another email with tracking information as soon as your order ships.</p>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin-bottom: 5px;">Thank you for choosing organic wellness.</p>
              <strong style="color: #1a5336; font-size: 16px;">The Puro Nova Team</strong>
            </div>
          </div>
        </div>
      `;
      sendEmail({
        email: updatedOrder.user.email,
        subject: `Payment Successful - Puro Nova [${updatedOrder.orderNumber}]`,
        html: emailContent
      }).catch(err => console.error("Email send error:", err));

      // Send email to Admin
      if (process.env.ADMIN_EMAIL) {
        const adminEmailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e4d3b; border-radius: 8px; padding: 20px;">
            <h2 style="color: #1e4d3b;">New Order Received (Prepaid)</h2>
            <p><strong>Order ID:</strong> ${updatedOrder.orderNumber}</p>
            <p><strong>Customer:</strong> ${updatedOrder.user.name} (${updatedOrder.user.email})</p>
            <p><strong>Total Amount:</strong> ₹${updatedOrder.total}</p>
            <p><strong>Payment Method:</strong> Razorpay (Paid)</p>
            <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            <p style="margin-top: 20px;">Please check the admin dashboard for full details.</p>
          </div>
        `;
        sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `NEW ORDER ALERT - ${updatedOrder.orderNumber} (PAID)`,
          html: adminEmailContent
        }).catch(err => console.error("Admin email send error:", err));
      }

      res.json({ success: true, message: 'Payment verified' });
    } else {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Razorpay webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);
    
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    
    if (expectedSignature === signature) {
      const event = req.body.event;
      if (event === 'payment.captured') {
        const paymentId = req.body.payload.payment.entity.id;
        const orderId = req.body.payload.payment.entity.notes?.orderId;
        if (orderId) {
          await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid', razorpayPaymentId: paymentId });
        }
      }
    }
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error' });
  }
});

export default router;
