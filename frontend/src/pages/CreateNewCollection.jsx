import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateNewCollection = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2100/api/collections/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        var errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      setMessage('Collection created successfully!');
      setTitle('');
      navigate('/collection');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Create New Collection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Collection</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default CreateNewCollection;
