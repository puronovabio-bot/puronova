import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dns from 'dns';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : 'http://localhost:5173';
app.use(cors({ 
  origin: [allowedOrigin, `${allowedOrigin}/`, 'http://localhost:5173'], 
  credentials: true 
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Puro Nova API running' }));

app.get('/api/test-smtp', async (req, res) => {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS ? 'configured' : 'missing';
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!emailUser || !process.env.EMAIL_PASS) {
      return res.json({
        success: false,
        error: "Missing EMAIL_USER or EMAIL_PASS in environment variables.",
        emailUser,
        emailPass,
        adminEmail
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
      auth: {
        user: emailUser,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    
    await transporter.sendMail({
      from: `Puro Nova Test <${emailUser}>`,
      to: adminEmail || emailUser,
      subject: "Live Server SMTP Diagnostics",
      html: "<h3>SMTP is working fine on the live server!</h3>"
    });

    res.json({
      success: true,
      message: `Test email sent successfully to ${adminEmail || emailUser}`,
      emailUser,
      adminEmail
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      emailUser: process.env.EMAIL_USER,
      adminEmail: process.env.ADMIN_EMAIL
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

// Connect DB and start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
