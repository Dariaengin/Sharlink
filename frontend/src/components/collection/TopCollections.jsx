import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const imageMap = {
  'Frontend Tools': '/images/Frontend-Tools-cover.jpg',
  'JavaScript Resources': '/images/JavaScript-Resources-cover.png',
  'Favorite Coffee Spots': '/images/Favorite-Coffee-Spots-cover.jpg',
  'Must-See Movies': '/images/Must-See-Movies-cover.jpg',
  'Hidden Gem Restaurants': '/images/Hidden-Gem-Restaurants-cover.jpg',
  'Dream Travel Destinations': '/images/Dream-Travel-Destinations-cover.jpg',
  'Inspiring Musicians': '/images/Inspiring-Musicians-cover.jpg',
  'Cozy Bookstores': '/images/Cozy-Bookstores-cover.jpg',
  'Weekend Getaways': '/images/Weekend-Getaways-cover.jpg',
  'Local Art & Museums': '/images/Local-Art-Museums-cover.jpg',
  'Best Podcasts Right Now': '/images/Best-Podcasts-Right-Now-cover.jpg',
  'Home Decor Inspo': '/images/Home-Decor-Inspo-cover.jpeg',
};

const TopCollections = ({ collections = [] }) => {
  const [sortedByLikesCol, setSortedByLikesCol] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sortedCollections = collections.sort(
      (a, b) => (b.likes || 0) - (a.likes || 0)
    );
    setSortedByLikesCol(sortedCollections);
  }, [collections]);

  const handleLike = async (collectionId) => {
    try {
      await axios.post(
        `http://localhost:2100/api/collections/${collectionId}/like`,
        {},
        { withCredentials: true }
      );

      // Refresh and sort collections after like
      const foundCol = sortedByLikesCol.map((col) => {
        if (col._id === collectionId) {
          return {
            ...col,
            likes: col.likes + 1,
          };
        }
        return col;
      });
      const sortedCollections = foundCol.sort(
        (a, b) => (b.likes || 0) - (a.likes || 0)
      );
      setSortedByLikesCol(sortedCollections);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error === 'Already liked'
      ) {
        alert('You have already liked this collection.');
      } else {
        console.error('Failed to like collection:', error);
        alert('Something went wrong while liking the collection.');
      }
    }
  };

  return (
    <section className='mt-5'>
      <h2 className='text-center mb-4'>Top Collections</h2>
      <div className='row justify-content-center'>
        {sortedByLikesCol.map((collection) => (
          <div
            key={collection._id}
            className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'
            onClick={() => navigate(`/collection/${collection._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className='card w-100 shadow-sm'>
              <img
                src={
                  imageMap[collection.title] || 'https://picsum.photos/300/180'
                }
                className='card-img-top'
                alt={collection.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className='card-body d-flex flex-column text-center'>
                <h5
                  className='card-title text-truncate mb-2'
                  style={{ minHeight: '60px', lineHeight: '1.2' }}
                >
                  {collection.title}
                </h5>
                <p className='text-muted small mb-2'>
                  {collection.linkIds?.length || 0} links
                </p>
                <button
                  className='btn btn-sm btn-outline-primary mt-auto'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigating to the collection page
                    handleLike(collection._id);
                  }}
                >
                  ❤️ {collection.likes ?? 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCollections;
