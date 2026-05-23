import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PenTool, Edit, Trash2, Plus, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminBlogs = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
    readTime: '',
    published: true
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      readTime: blog.readTime,
      published: blog.published
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog', err);
        alert('Failed to delete blog');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await axios.put(`http://localhost:5000/api/blogs/${editingBlog}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/blogs', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      setEditingBlog(null);
      setFormData({
        title: '', category: '', excerpt: '', content: '', image: '', readTime: '', published: true
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog', err);
      alert('Failed to save blog');
    }
  };

  if (loading) return <div className="admin-loading">Loading blogs...</div>;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h3>Manage Blogs</h3>
          <p>Create and edit articles for the Learn page</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingBlog(null);
            setFormData({ title: '', category: '', excerpt: '', content: '', image: '', readTime: '', published: true });
            setShowModal(true);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} /> New Blog
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">No blogs found. Create one!</td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={blog.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span style={{ fontWeight: '500' }}>{blog.title}</span>
                    </div>
                  </td>
                  <td>{blog.category}</td>
                  <td>
                    <span className={`status-badge ${blog.published ? 'status-delivered' : 'status-pending'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => handleEdit(blog)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(blog._id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '700px' }}>
            <div className="admin-modal-header">
              <h3>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
              <button onClick={() => setShowModal(false)} className="close-modal"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Read Time (e.g., "5 min read")</label>
                  <input type="text" name="readTime" value={formData.readTime} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" name="image" value={formData.image} onChange={handleInputChange} required placeholder="https://example.com/image.jpg" />
              </div>

              <div className="form-group">
                <label>Excerpt (Short summary)</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} required rows="2"></textarea>
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="6"></textarea>
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="published" checked={formData.published} onChange={handleInputChange} id="published" />
                <label htmlFor="published" style={{ margin: 0 }}>Publish immediately</label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingBlog ? 'Update Blog' : 'Create Blog'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
