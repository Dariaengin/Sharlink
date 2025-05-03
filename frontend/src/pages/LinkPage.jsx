import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LinkPage = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [collection, setCollection] = useState(null);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // get the user from the session token.
        const res = await axios.get('http://localhost:2100/api/user', {
          withCredentials: true,
        });
        setCurrentUserId(res.data.user._id);
      } catch (err) {
        console.log('Not logged in');
      }
    };
    fetchUser();
  }, []);

  // Get collection info
  useEffect(() => {
    if (link && link.collectionId) {
      const fetchCollection = async () => {
        try {
          const res = await axios.get(
            `http://localhost:2100/api/collections/${link.collectionId}`
          );
          setCollection(res.data);
        } catch (err) {
          console.error('Failed to fetch collection:', err);
        }
      };
      fetchCollection();
    }
  }, [link]);

  // Get link by ID
  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2100/api/links/${linkId}`
        );
        setLink(res.data);
      } catch (err) {
        console.error('Failed to fetch link:', err);
      }
    };
    fetchLink();
  }, [linkId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2100/api/links/${linkId}`, {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to delete link:', err);
    }
  };

  if (!link) return <p>Loading link...</p>;

  const isOwner = currentUserId && link.userId === currentUserId;

  return (
    <div className='container mt-4'>
      {collection && (
        <div className='d-flex align-items-center mb-4'>
          <button className='btn btn-link' onClick={() => navigate('/')}>
            All collections
          </button>
          <span className='mx-2'>/</span>
          <button
            className='btn btn-link'
            onClick={() => navigate(`/collection/${collection._id}`)}
          >
            {collection.title}
          </button>
        </div>
      )}

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h1>{link.title}</h1>
          <p>{link.description}</p>
        </div>
        <div className='d-flex gap-2'>
          <a
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-primary'
          >
            Visit Link
          </a>
          {isOwner && (
            <>
              <button
                className='btn btn-outline-secondary'
                onClick={() => navigate(`/link/${link._id}/edit`)}
              >
                <i className='bi bi-pencil-square me-2'></i> Edit Link
              </button>

              <button className='btn btn-outline-danger' onClick={handleDelete}>
                <i className='bi bi-trash me-2'></i> Delete Link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
