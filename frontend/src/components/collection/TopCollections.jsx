import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <section className='mt-5'>
      <h2 className='text-center mb-4'>Top Collections</h2>
      <div className='row justify-content-center'>
        {collections.length === 0 ? (
          <div className='text-center mt-5'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/6134/6134065.png'
              alt='No results'
              style={{ width: '200px', maxWidth: '100%', marginBottom: '20px' }}
            />
            <h5>No collections match your search.</h5>
            <p className='text-muted'>Try a different keyword.</p>
          </div>
        ) : (
          collections.map((collection) => (
            <div
              key={collection._id}
              className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'
              onClick={() => navigate(`/collection/${collection._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className='card w-100 shadow-sm'>
                <img
                  src={
                    imageMap[collection.title] ||
                    'https://picsum.photos/300/180'
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TopCollections;
