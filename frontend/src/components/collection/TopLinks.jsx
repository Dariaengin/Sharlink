import React from 'react';
import LinkCard from './LinkCard';

const TopLinks = ({ linksData }) => {
  return (
    <section className='mt-5'>
      <h2 className='text-center mb-4'>Top Links</h2>
      <div className='row justify-content-center'>
        {linksData.length > 0 ? (
          linksData.map((data, index) => {
            const meta = data.hybridGraph;
            return (
              <LinkCard
                key={index}
                title={meta?.title || 'No title'}
                coverImage={
                  meta?.image || 'https://picsum.photos/seed/default/300/180'
                }
                description={meta?.description || 'No description'}
                url={meta?.url || '#'}
              />
            );
          })
        ) : (
          <p className='text-center'>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default TopLinks;
