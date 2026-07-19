import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';
import multer from 'multer';
import path from 'path';
import sendEmail from '../utils/sendEmail.js';
const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ====== DASHBOARD ======
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ paymentStatus: 'paid' });
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const recentOrders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(10);
    const monthlySales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$total' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);
    const bestSelling = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', totalSold: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    const pendingOrders = await Order.countDocuments({ orderStatus: 'placed' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'cancelled' });
    const lowStockAlerts = await Product.find({ sizes: { $elemMatch: { stock: { $lt: 10 } } } }).limit(5);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalProducts,
        totalCustomers,
        recentOrders,
        monthlySales,
        bestSelling,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
        lowStockAlerts,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====== PRODUCTS CRUD ======
router.get('/products', protect, admin, async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/products', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.files) data.images = req.files.map(f => '/uploads/' + f.filename);
    const product = await Product.create(data);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/products/:id', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.files?.length) data.images = req.files.map(f => '/uploads/' + f.filename);
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/products/:id', protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====== ORDERS ======
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/orders/:id/status', protect, admin, async (req, res) => {
  try {
    const { status, note } = req.body;
    const update = { orderStatus: status, $push: { statusHistory: { status, note: note || `Status changed to ${status}` } } };
    if (status === 'delivered') update.deliveredAt = new Date();
    
    // Find order and populate user to get email
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true }).populate('user', 'name email');
    
    if (order && order.user) {
      const emailContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #1a5336; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">PURO NOVA</h1>
            <p style="color: #a0d8ba; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order Status Update</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">Dear <strong>${order.user.name}</strong>,</p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">The status of your Puro Nova order (<strong>${order.orderNumber || order._id}</strong>) has been updated.</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #1a5336;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #718096; font-size: 14px;">New Status:</td>
                  <td style="padding: 8px 0; color: #1a5336; font-size: 18px; font-weight: 700; text-align: right; text-transform: capitalize;">${status}</td>
                </tr>
              </table>
            </div>
            
            ${status === 'shipped' ? '<p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Your items are on the way! You will receive them shortly.</p>' : ''}
            ${status === 'delivered' ? '<p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Your order has been delivered! We hope you love your products.</p>' : ''}
            ${status === 'cancelled' ? '<p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">We regret to inform you that your order has been cancelled. If you have any questions, please contact our support team.</p>' : ''}
            
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin-bottom: 5px;">Thank you for choosing organic wellness.</p>
              <strong style="color: #1a5336; font-size: 16px;">The Puro Nova Team</strong>
            </div>
          </div>
        </div>
      `;
      
      await sendEmail({
        email: order.user.email,
        subject: `Puro Nova - Order Status Updated to ${status.toUpperCase()}`,
        html: emailContent
      });
    }
    
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====== CUSTOMERS ======
router.get('/customers', protect, admin, async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, customers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/customers/:id/block', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====== CATEGORIES CRUD ======
router.post('/categories', protect, admin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/categories/:id', protect, admin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====== COUPONS CRUD ======
router.get('/coupons', protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/coupons', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, coupon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/coupons/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, coupon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/coupons/:id', protect, admin, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
