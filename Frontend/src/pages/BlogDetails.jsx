import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import './Learn.css';
import blog1 from '../assets/learn_blog_1.png';
import blog2 from '../assets/learn_blog_2.png';
import blog3 from '../assets/learn_blog_3.png';

const fallbackArticles = [
  {
    _id: 'f1',
    slug: 'science-of-bio-enzymes',
    title: 'The Science of Bio-Enzymes in Cleaning',
    category: 'Home Care',
    excerpt: 'Discover how natural bio-enzymes break down stains and grime at a microscopic level, offering a safer alternative to harsh chemicals.',
    readTime: '4 min read',
    createdAt: new Date('2026-05-15').toISOString(),
    image: blog1
  },
  {
    _id: 'f2',
    slug: 'benefits-of-neem-and-turmeric',
    title: 'Why Neem and Turmeric Are Skincare Superheroes',
    category: 'Personal Care',
    excerpt: 'Explore the Ayurvedic wisdom behind using neem and raw turmeric for clear, glowing, and healthy skin.',
    readTime: '5 min read',
    createdAt: new Date('2026-05-20').toISOString(),
    image: blog2
  },
  {
    _id: 'f3',
    slug: 'switch-to-unrefined-jaggery',
    title: 'Making the Switch to Unrefined Organic Jaggery',
    category: 'Heartful Foods',
    excerpt: 'Learn why unrefined jaggery is more than just a sweetener, and how its natural minerals support your overall wellness.',
    readTime: '3 min read',
    createdAt: new Date('2026-05-25').toISOString(),
    image: blog3
  }
];

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://puronova.onrender.com/api/blogs/${slug}`);
        if (res.data.success) {
          const fetchedBlog = res.data.blog;
          setBlog(fetchedBlog);
          
          document.title = `${fetchedBlog.title} | Puro Nova Learn`;
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', fetchedBlog.excerpt);
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        console.error('Failed to fetch blog via API, falling back...', err);
        const fallback = fallbackArticles.find(a => a.slug === slug || a._id === slug);
        if (fallback) {
          setBlog({
            ...fallback,
            content: "Nature has provided us with incredible solutions for our everyday needs. " + fallback.excerpt + "\n\nBy embracing traditional wisdom and combining it with modern understanding, we can make choices that are better for our health and our environment.\n\nAt Puro Nova, we believe in the power of these natural ingredients and formulate our products to maximize their benefits without the need for harsh additives."
          });
          document.title = `${fallback.title} | Puro Nova Learn`;
        } else {
          setError('Article not found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

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
