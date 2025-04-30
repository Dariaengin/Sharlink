import React from 'react';

const TopCollections = () => {
  return (
    <section className='mt-5'>
      <h2 className='text-center mb-4'>Top Collections</h2>
      <div className='row justify-content-center'>
        {[
          {
            title: 'Tech News',
            coverImage: 'https://picsum.photos/seed/tech/300/180',
            linkCount: 12,
          },
          {
            title: 'Design Resources',
            coverImage: 'https://picsum.photos/seed/design/300/180',
            linkCount: 8,
          },
          {
            title: 'Productivity Tools',
            coverImage: 'https://picsum.photos/seed/tools/300/180',
            linkCount: 15,
          },
          {
            title: 'Marketing Insights',
            coverImage: 'https://picsum.photos/seed/marketing/300/180',
            linkCount: 10,
          },
        ].map((collection, index) => (
          <div
            key={index}
            className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'
          >
            <div className='card w-100 shadow-sm'>
              <img
                src={collection.coverImage}
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
                <p className='text-muted small mb-0'>
                  {collection.linkCount} links
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCollections;
