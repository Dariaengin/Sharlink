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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:2100/api/links/${linkId}`, formData, {
        withCredentials: true,
      });
      alert('Link added successfully!');
      setFormData({ url: '', title: '', description: '', category: '' });
      setErrors({});
    } catch (error) {
      console.error('Error adding link:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Failed to add link. Check console for details.');
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="bg-light p-4 rounded h-100 d-flex flex-column justify-content-between">

            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>

              <div className="row align-items-center">
                <label htmlFor="url" className="col-sm-3 col-form-label">
                  URL<span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                  {errors.url && <div className="text-danger small">{errors.url}</div>}
                </div>
              </div>

              <div className="row align-items-center">
                <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row align-items-center">
                <label htmlFor="category" className="col-sm-3 col-form-label">
                  Category<span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="Computer Games">Computer Games</option>
                    <option value="Musicians">Musicians</option>
                    <option value="Museums">Museums</option>
                  </select>
                  {errors.category && <div className="text-danger small">{errors.category}</div>}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-auto">
                <button type="submit" className="btn btn-primary">
                  Submit (add link)
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;