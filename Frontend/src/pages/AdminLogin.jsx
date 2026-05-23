import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // If already logged in as admin, go straight to dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        if (data.user.role === 'admin') {
          login(data.user, data.token);
          navigate('/admin');
        } else {
          setError('Access denied. This login is for administrators only.');
        }
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg-pattern" />

      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <div className="admin-login-icon">
              <Shield size={32} />
            </div>
            <h1>PURO NOVA</h1>
            <p>Admin Portal</p>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-field">
              <label>Email Address</label>
              <div className="admin-input-wrapper">
                <Mail size={18} className="admin-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@puronova.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="admin-form-field">
              <label>Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="admin-input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="admin-login-spinner" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/">
              <ArrowLeft size={14} />
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
