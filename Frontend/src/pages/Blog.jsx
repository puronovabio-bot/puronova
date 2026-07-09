import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'The Magic of Bio-Enzymes in Home Cleaning',
      excerpt: 'Discover why bio-enzymes are the future of sustainable, safe, and effective home hygiene...',
      date: 'May 10, 2026',
      author: 'Wellness Expert',
      category: 'Home Care',
      img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=400&h=250&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Traditional Skincare vs Modern Chemicals',
      excerpt: 'A deep dive into why ancient herbal remedies are making a massive comeback in the beauty world...',
      date: 'May 12, 2026',
      author: 'TouchCo Beauty',
      category: 'Personal Care',
      img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&h=250&auto=format&fit=crop'
    }
  ];

  return (
    <div className="blog-page">
      <div className="container">
        <header className="blog-header section-padding text-center">
          <h1 className="heading-xl">Puro Nova Stories</h1>
          <p className="text-lead mx-auto">Insights into natural living, herbal wisdom, and sustainable wellness.</p>
        </header>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card reveal">
              <div className="blog-img-wrapper">
                <img src={post.img} alt={post.title} />
                <span className="blog-cat-tag">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span>{post.date}</span> • <span>{post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button className="read-more">Read Full Story ➔</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
