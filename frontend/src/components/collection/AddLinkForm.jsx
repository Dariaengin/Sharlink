import React, { useState } from 'react';

const AddLinkForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    coverImage: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: '', url: '', description: '', coverImage: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-3">
        <input
          className="form-control"
          name="title"
          placeholder="Link title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          name="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          name="description"
          placeholder="Short description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          name="coverImage"
          placeholder="Image URL"
          value={formData.coverImage}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 text-end">
        <button type="submit" className="btn btn-primary">
          Add Link
        </button>
      </div>
    </form>
  );
};

export default AddLinkForm;
