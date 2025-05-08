import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add this line
import axios from 'axios';

const AddLinkForm = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const [collectionTitle, setCollectionTitle] = useState('');

  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    collectionId: '',
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

  useEffect(() => {
    if (collectionId) {
      setFormData((prev) => ({ ...prev, collectionId }));
      axios
        .get(`http://localhost:2100/api/collections/${collectionId}`)
        .then((res) => setCollectionTitle(res.data.title))
        .catch((err) => console.error('Error fetching collection title:', err));
    }
  }, [collectionId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.url.trim()) newErrors.url = 'URL is required';
    if (!formData.collectionId) newErrors.collectionId = 'Category is required';
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
      navigate('/collection');
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Failed to add link. Check console for details.');
    }
  };

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='bg-light p-4 rounded h-100 d-flex flex-column justify-content-between'>
            {collectionTitle && (
              <h5 className='mb-3'>Adding link to: <strong>{collectionTitle}</strong></h5>
            )}
            <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
              <input
                type='text'
                name='url'
                placeholder='URL'
                value={formData.url}
                onChange={handleChange}
              />
              {errors.url && <div className='text-danger'>{errors.url}</div>}

              <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleChange}
              />

              <textarea
                name='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
              />

              <select
                name='collectionId'
                value={formData.collectionId}
                onChange={handleChange}
              >
                <option value=''>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {errors.collectionId && (
                <div className='text-danger'>{errors.collectionId}</div>
              )}

              <button type='submit'>Add Link</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;
