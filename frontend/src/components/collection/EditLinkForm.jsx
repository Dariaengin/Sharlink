import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditLinkForm = () => {
  const { linkId } = useParams();

  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(`/api/links/${linkId}`);
        setFormData(res.data);
      } catch (error) {
        console.error(error);
        alert('Failed to load link');
      }
    };

    fetchLink();
  }, [linkId]);

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

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`/api/links/${linkId}`, formData);
      alert('Link updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update link');
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
              placeholder="pre-filled url"
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
              placeholder="pre-filled title"
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
              placeholder="pre-filled description"
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
        <button className="align-end" type="button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditLinkForm;
