import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Puro Nova';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="not-found-page">
      <div className="container text-center">
        <h1 className="not-found-error">404</h1>
        <h2 className="heading-md" style={{ marginBottom: '15px' }}>Oops! Page Not Found</h2>
        <p className="not-found-text">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
