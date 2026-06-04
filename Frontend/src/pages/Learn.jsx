import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Learn.css';
import learnHero from '../assets/learn_hero.png';
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

const Learn = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [articles, loading]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://puronova.onrender.com/api/blogs');
        if (res.data.success && res.data.blogs.length > 0) {
          setArticles(res.data.blogs);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="learn-page">
      {/* Hero Section */}
      <section className="learn-hero">
        <div className="learn-hero-image">
          <img src={learnHero} alt="Learn about our natural philosophy" className="img-cover" />
        </div>
        <div className="container">
          <div className="learn-hero-content reveal">
            <h1 className="heading-lg">Learn</h1>
            <p className="text-lead">
              We write about the science behind our ingredients, the traditions we draw from, and the choices we make in formulation. No fluff — just honest, useful information.
            </p>
          </div>
        </div>
      </section>

      <div className="container section-padding">
        <div className="articles-grid">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>Loading articles...</div>
          ) : articles.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>No articles published yet. Check back soon!</div>
          ) : (
            articles.map((article, index) => (
              <article key={article._id} className={`article-card reveal delay-${(index % 3) + 1}`}>
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <span className="article-category">{article.category}</span>
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-excerpt">{article.excerpt}</p>
                  
                  <div className="article-meta">
                    <span>{new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="meta-dot">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <Link to={`/learn/${article.slug || article._id}`} className="read-more">
                    Read article <span>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;
