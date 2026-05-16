import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';
import User from './models/User.js';
import Coupon from './models/Coupon.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Coupon.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@puronova.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 9999999999',
    });
    console.log('✅ Admin created: admin@puronova.com / admin123');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Home Care & Hygiene', slug: 'home-care', description: 'Eco-friendly home cleaning solutions powered by bio-enzymes', subBrand: 'NeatCo by Puro Nova', order: 1 },
      { name: 'Personal Care', slug: 'personal-care', description: 'Natural personal care products for gentle, effective results', subBrand: 'TouchCo by Puro Nova', order: 2 },
      { name: 'Wellness & Herbal', slug: 'wellness-herbal', description: 'Traditional herbal wellness products rooted in ancient wisdom', subBrand: 'Puro Nova', order: 3 },
      { name: 'Heartfull Foods', slug: 'heartfull-foods', description: 'Wholesome, natural food products made with love', subBrand: 'Puro Nova', order: 4 },
    ]);
    console.log('✅ Categories created');

    const [homeCare, personalCare, wellness, foods] = categories;

    // Create all products
    const products = await Product.insertMany([
      // === HOME CARE ===
      {
        name: 'Dish Wash Liquid',
        slug: 'dish-wash-liquid',
        description: 'A powerful yet gentle dish wash liquid with citrus lemon bio-enzyme formula. Cuts through grease naturally while being safe for your hands and the environment.',
        ingredients: 'Citrus bio enzyme, xanthan gum, natural surfactant, essential oil',
        benefits: 'Chemical-free cleaning, Safe for hands, Bio-degradable, Effective grease cutting',
        category: homeCare._id,
        brand: 'NeatCo by Puro Nova',
        theme: 'Citrus lemon themed design',
        variants: [
          { size: '500ml', price: 165, stock: 100 },
          { size: '1 Litre', price: 260, stock: 80 },
        ],
        images: ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=500&auto=format&fit=crop'],
        rating: 4.8,
        numReviews: 24,
        featured: true,
      },
      {
        name: 'Detergent',
        slug: 'detergent',
        description: 'Bio-enzyme powered laundry detergent that deep cleans your clothes with the fresh scent of citrus. Gentle on fabrics, tough on stains.',
        ingredients: 'Citrus bio enzyme, xanthan gum & guar gum, natural surfactant, essential oil',
        benefits: 'Deep cleaning, Fabric safe, Fresh citrus scent, Eco-friendly',
        category: homeCare._id,
        brand: 'NeatCo by Puro Nova',
        theme: 'Citrus lemon themed design',
        variants: [
          { size: '500ml', price: 135, stock: 100 },
          { size: '1 Litre', price: 260, stock: 80 },
        ],
        images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=500&auto=format&fit=crop'],
        rating: 4.7,
        numReviews: 18,
        featured: false,
      },
      {
        name: 'Floor Cleaner',
        slug: 'floor-cleaner',
        description: 'Natural floor cleaner with neem and lemon bio-enzymes. Leaves floors sparkling clean with a refreshing fragrance.',
        ingredients: 'Pomegranate & citrus bioenzyme, xanthan gum, Coconut based surfactant, Fragrance oils',
        benefits: 'Anti-bacterial, Fresh fragrance, Safe for kids and pets, Non-toxic',
        category: homeCare._id,
        brand: 'NeatCo by Puro Nova',
        theme: 'Neem + lemon themed design',
        variants: [
          { size: '500ml', price: 140, stock: 100 },
          { size: '1 Litre', price: 260, stock: 80 },
        ],
        images: ['https://images.unsplash.com/photo-1585833758064-9cb696662705?q=80&w=500&auto=format&fit=crop'],
        rating: 4.9,
        numReviews: 15,
        featured: true,
      },

      // === PERSONAL CARE ===
      {
        name: 'Face Wash',
        slug: 'face-wash',
        description: 'A luxurious face wash infused with rose and papaya bio-enzymes. Gently cleanses, exfoliates and nourishes your skin for a radiant glow.',
        ingredients: 'Rose bio enzyme, papaya bio enzyme, xanthan gum, natural surfactant, essential oils, glycerin',
        benefits: 'Deep cleansing, Natural exfoliation, Skin brightening, Hydrating',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Rose + papaya themed design',
        variants: [
          { size: '100ml', price: 175, stock: 120 },
          { size: '200ml', price: 325, stock: 90 },
        ],
        images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop'],
        rating: 4.8,
        numReviews: 32,
        featured: true,
      },
      {
        name: 'Body Wash',
        slug: 'body-wash',
        description: 'Rejuvenating body wash with raw turmeric and aloe vera. Nourishes skin deeply while providing a refreshing bathing experience.',
        ingredients: 'Citrus bio enzyme, raw turmeric, nagarmotha, xanthan gum, natural surfactant, aloe vera gel, glycerin, essential oil',
        benefits: 'Skin nourishment, Anti-inflammatory, Moisturizing, Natural fragrance',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Raw turmeric, aloevera themed design',
        variants: [
          { size: '200ml', price: 180, stock: 100 },
          { size: '500ml', price: 350, stock: 70 },
        ],
        images: ['https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=500&auto=format&fit=crop'],
        rating: 4.9,
        numReviews: 28,
        featured: true,
      },
      {
        name: 'Tooth Powder',
        slug: 'tooth-powder',
        description: 'Traditional Ayurvedic tooth powder with cloves, rock salt and mint. Strengthens gums and whitens teeth naturally.',
        ingredients: 'Gomaya bhasmam, pacha karpuram, cloves, rock salt, vamu, jeera, paniya, mint flower, cold pressed sesame oil',
        benefits: 'Gum strengthening, Natural whitening, Fresh breath, Anti-bacterial',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Cloves, salt, Mint theme',
        variants: [
          { size: '50gms', price: 120, stock: 150 },
        ],
        images: ['https://images.unsplash.com/photo-1607341883307-e85df6a50654?q=80&w=500&auto=format&fit=crop'],
        rating: 4.7,
        numReviews: 20,
        featured: false,
      },
      {
        name: 'Hand Wash',
        slug: 'hand-wash',
        description: 'Neem-infused hand wash with bio-enzyme formula. Effectively removes germs while keeping hands soft and moisturized.',
        ingredients: 'Citrus bio enzyme, neem bio enzyme, guar gum, natural surfactant, glycerin, essential oil',
        benefits: 'Germ protection, Moisturizing, Neem benefits, Chemical-free',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Neem theme',
        variants: [
          { size: '200ml', price: 135, stock: 120 },
        ],
        images: ['https://images.unsplash.com/photo-1584824388143-6c8430e37bc6?q=80&w=500&auto=format&fit=crop'],
        rating: 4.6,
        numReviews: 16,
        featured: false,
      },
      {
        name: 'Face Pack & Bath Powder',
        slug: 'face-pack-bath-powder',
        description: 'Multi-purpose herbal face pack and bath powder made with 16+ natural ingredients. Cleanses, exfoliates and brightens skin naturally.',
        ingredients: 'Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multanimatti',
        benefits: 'Natural exfoliation, Skin brightening, Deep cleansing, Anti-aging',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Herbal theme',
        variants: [
          { size: '100gms', price: 135, stock: 100 },
          { size: '200gms', price: 270, stock: 80 },
        ],
        images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=500&auto=format&fit=crop'],
        rating: 4.9,
        numReviews: 35,
        featured: true,
      },
      {
        name: 'Shampoo',
        slug: 'shampoo',
        description: 'Herbal shampoo with soapnuts, shikakai and hibiscus flowers. Gently cleanses hair while promoting growth and reducing hair fall.',
        ingredients: 'Citrus bioenzyme, soapnuts, shikakai, dry amla, menthulu, aloevera, Hibiscus flowers, natural surfactants, xanthan gum, fragrance',
        benefits: 'Hair strengthening, Reduces hair fall, Natural shine, Scalp health',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Herbal theme',
        variants: [
          { size: '200ml', price: 140, stock: 100 },
          { size: '500ml', price: 350, stock: 60 },
        ],
        images: ['https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500&auto=format&fit=crop'],
        rating: 4.8,
        numReviews: 22,
        featured: false,
      },
      {
        name: 'Natural Hair Dye',
        slug: 'natural-hair-dye',
        description: 'Chemical-free herbal hair dye made with mehendi, amla and coffee. Colors hair naturally while nourishing from root to tip.',
        ingredients: 'Mahendi, Amla, Reetha, Nagamotha, Jatamasi, Behda, Turmeric, Coffee, Iron Rust',
        benefits: 'Chemical-free coloring, Hair nourishment, Scalp friendly, Long-lasting',
        category: personalCare._id,
        brand: 'TouchCo by Puro Nova',
        theme: 'Herbal theme',
        variants: [
          { size: '50gms', price: 100, stock: 120 },
        ],
        images: ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=500&auto=format&fit=crop'],
        rating: 4.7,
        numReviews: 14,
        featured: false,
      },

      // === WELLNESS & HERBAL ===
      {
        name: 'Bio Salt Liquid',
        slug: 'bio-salt-liquid',
        description: 'Traditional wellness liquid made from rice starch and river salt. A natural digestive aid and health supplement.',
        ingredients: 'Rice starch & river salt',
        benefits: 'Digestive aid, Natural electrolytes, Traditional remedy, Chemical-free',
        category: wellness._id,
        brand: 'Puro Nova',
        theme: 'Wellness theme',
        variants: [
          { size: '200ml', price: 85, stock: 100 },
        ],
        images: ['https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=500&auto=format&fit=crop'],
        rating: 4.8,
        numReviews: 10,
        featured: false,
      },
      {
        name: 'AmruthaDhara',
        slug: 'amruthadhara',
        description: 'Concentrated herbal wellness drops with mint, camphor and cow ghee. A traditional remedy for headaches, cold, and digestive issues.',
        ingredients: 'Vamu flower, mint flower, pacha karpuram, cow ghee',
        benefits: 'Headache relief, Cold remedy, Digestive aid, Instant freshness',
        category: wellness._id,
        brand: 'Puro Nova',
        theme: 'Mint, camphor theme',
        variants: [
          { size: '10ml', price: 100, stock: 200 },
        ],
        images: ['https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=500&auto=format&fit=crop'],
        rating: 4.9,
        numReviews: 42,
        featured: true,
      },
    ]);
    console.log(`✅ ${products.length} products created`);

    // Create sample coupons
    await Coupon.insertMany([
      { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrderAmount: 200, maxDiscount: 100, usageLimit: 100 },
      { code: 'PURO50', discountType: 'fixed', discountValue: 50, minOrderAmount: 500 },
    ]);
    console.log('✅ Coupons created: WELCOME10, PURO50');

    console.log('\n🌿 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
