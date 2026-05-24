import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import './Learn.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://puronova.onrender.com/api/blogs/${id}`);
        if (res.data.success) {
          const fetchedBlog = res.data.blog;
          setBlog(fetchedBlog);
          
          // Update SEO Title and Meta Description
          document.title = `${fetchedBlog.title} | Puro Nova Learn`;
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', fetchedBlog.excerpt);
          
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Failed to fetch blog', err);
        setError('Failed to load the article');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="blog-details-loading">Loading article...</div>;
  if (error || !blog) return (
    <div className="blog-details-error">
      <h2>{error || 'Article not found'}</h2>
      <Link to="/learn" className="btn btn-outline">Back to Learn</Link>
    </div>
  );

  return (
    <div className="blog-details-page">
      <div className="blog-details-header" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${blog.image})` }}>
        <div className="container">
          <Link to="/learn" className="back-link">
            <ArrowLeft size={18} /> Back to Learn
          </Link>
          <span className="blog-category-badge">{blog.category}</span>
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta-info">
            <div className="meta-item">
              <Calendar size={16} />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container blog-content-container">
        <div className="blog-content">
          <p className="blog-excerpt-lead">{blog.excerpt}</p>
          
          {/* Simple splitting by double newline to render paragraphs */}
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="blog-footer">
          <Link to="/learn" className="btn btn-primary">
            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> View more articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
