import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddLinkForm = () => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/collections');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.url.trim()) newErrors.url = 'URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:2100/api/links', formData, {
        withCredentials: true,
      });
      alert('Link added successfully!');
      setFormData({ url: '', title: '', description: '', category: '' });
      setErrors({});
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Failed to add link. Check console for details.');
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="bg-light p-4 rounded h-100 d-flex flex-column justify-content-between">
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={formData.url}
                onChange={handleChange}
              />
              {errors.url && <div className="text-danger">{errors.url}</div>}

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="text-danger">{errors.category}</div>
              )}

              <button type="submit">Add Link</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;
