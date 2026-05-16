import express from 'express';
import Coupon from '../models/Coupon.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

// Validate coupon
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) return res.status(404).json({ success: false, message: 'Invalid coupon' });
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return res.status(400).json({ success: false, message: 'Coupon expired' });
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    if (orderAmount < coupon.minOrderAmount) return res.status(400).json({ success: false, message: `Minimum order ₹${coupon.minOrderAmount}` });

    let discount = coupon.discountType === 'percentage' ? (orderAmount * coupon.discountValue) / 100 : coupon.discountValue;
    if (coupon.maxDiscount > 0 && discount > coupon.maxDiscount) discount = coupon.maxDiscount;

    res.json({ success: true, discount: Math.round(discount), coupon: { code: coupon.code, discountType: coupon.discountType, discountValue: coupon.discountValue } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
