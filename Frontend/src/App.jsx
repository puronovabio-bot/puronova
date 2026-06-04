import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Philosophy from './pages/Philosophy';
import Ingredients from './pages/Ingredients';
import Learn from './pages/Learn';
import About from './pages/About';
import BlogDetails from './pages/BlogDetails';
import ScrollToTop from './components/ScrollToTop';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailed from './pages/OrderFailed';

import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import FAQs from './pages/FAQs';
import NotFound from './pages/NotFound';
import IngredientDetails from './pages/IngredientDetails';

const PublicLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Public Routes - With Navbar/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-failed" element={<OrderFailed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<BlogDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-policy" element={<TermsConditions />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/ingredients/:slug" element={<IngredientDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
