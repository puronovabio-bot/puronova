import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@puronova' });
    if (existing) {
      // Update existing admin password
      existing.password = 'Puronova@2026#';
      existing.role = 'admin';
      await existing.save();
      console.log('✅ Admin user password reset successfully!');
    } else {
      // Create new admin
      await User.create({
        name: 'Admin',
        email: 'admin@puronova',
        password: 'Puronova@2026#',
        role: 'admin',
        phone: '+91 9999999999',
      });
      console.log('✅ Admin user created successfully!');
    }

    console.log('   Email:    admin@puronova');
    console.log('   Password: Puronova@2026#');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

createAdmin();
