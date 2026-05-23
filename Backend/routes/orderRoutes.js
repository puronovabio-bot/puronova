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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e4d3b;">Order Confirmed!</h2>
          <p>Dear ${req.user.name},</p>
          <p>Your order (<strong>${order.orderNumber}</strong>) has been successfully placed via Cash on Delivery.</p>
          <p>Total Amount: <strong>₹${order.total}</strong></p>
          <p>We will notify you once it ships. Thank you for shopping with Puro Nova!</p>
        </div>
      `;
      await sendEmail({
        email: req.user.email,
        subject: `Order Confirmation - Puro Nova [${order.orderNumber}]`,
        html: emailContent
      });

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
        await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `NEW ORDER ALERT - ${order.orderNumber} (COD)`,
          html: adminEmailContent
        });
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
