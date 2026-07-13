import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';
import sendEmail from '../utils/sendEmail.js';
const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, shippingCharge, tax, discount, total, coupon, paymentMethod } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ success: false, message: 'No order items' });

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      subtotal,
      shippingCharge,
      tax,
      discount,
      total,
      coupon,
      paymentMethod,
      statusHistory: [{ status: 'placed', note: 'Order placed' }],
    });

    if (paymentMethod === 'cod') {
      const emailContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #1a5336; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">PURO NOVA</h1>
            <p style="color: #a0d8ba; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order Confirmed</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Thank you for your order!</h2>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Dear <strong>${req.user.name}</strong>,</p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Your order has been successfully placed via Cash on Delivery and is now being processed.</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #1a5336;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #718096; font-size: 14px;">Order Number:</td>
                  <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 600; text-align: right;">${order.orderNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096; font-size: 14px;">Total Amount:</td>
                  <td style="padding: 8px 0; color: #1a5336; font-size: 18px; font-weight: 700; text-align: right;">₹${order.total}</td>
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
        email: order.shippingAddress?.email || req.user.email,
        subject: `Order Confirmation - Puro Nova [${order.orderNumber}]`,
        html: emailContent
      }).catch(err => console.error("Email send error:", err));

      // Send email to Admin
      if (process.env.ADMIN_EMAIL) {
        const adminEmailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e4d3b; border-radius: 8px; padding: 20px;">
            <h2 style="color: #1e4d3b;">New Order Received (COD)</h2>
            <p><strong>Order ID:</strong> ${order.orderNumber}</p>
            <p><strong>Customer:</strong> ${req.user.name} (${req.user.email})</p>
            <p><strong>Total Amount:</strong> ₹${order.total}</p>
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
            <p style="margin-top: 20px;">Please check the admin dashboard for full details.</p>
          </div>
        `;
        sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `NEW ORDER ALERT - ${order.orderNumber} (COD)`,
          html: adminEmailContent
        }).catch(err => console.error("Admin email send error:", err));
      }
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get my orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get order by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Track order by order number
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).select('orderNumber orderStatus statusHistory items total createdAt');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
