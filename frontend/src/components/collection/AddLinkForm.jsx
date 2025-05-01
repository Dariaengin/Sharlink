import React, { useState } from 'react';
import axios from 'axios';

const AddLinkForm = () => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/links', formData);
      alert('Link added successfully!');
      setFormData({ url: '', title: '', description: '', category: '' });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert('Failed to add link');
    }
  };

  return (
    <div className="grid-container">
      <div className="item1">
        <p>Header: Logo + Navigation Links</p>
      </div>

      <div className="item2">
        <div className="ver">
          <div>
            <label>URL</label>
            <input
              className="input-field"
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder=" "
            />
            {errors.url && <p className="error-text">{errors.url}</p>}
          </div>

          <div>
            <label>Title</label>
            <input
              className="input-field"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder=" "
            />
          </div>

          <div>
            <label>Description</label>
            <input
              className="input-field"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder=" "
            />
          </div>

          <div>
            <label htmlFor="category">Choose a category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="Computer Games">Computer Games</option>
              <option value="Musicians">Musicians</option>
              <option value="Museums">Museums</option>
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>
        </div>
      </div>

      <div className="item3">
        <div className="divflex">
          <button className="align" type="button" onClick={handleSubmit}>
            Submit (add link)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;
