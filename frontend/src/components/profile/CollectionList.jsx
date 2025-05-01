// components/profile/CollectionList.jsx
import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionList = ({ collections }) => {
  return (
    <div className="row">
      {collections.map((col, index) => (
        <CollectionCard
          key={col.id}
          title={col.title}
          coverImage={col.coverImage}
          numberOfLinks={col.numberOfLinks}
          description={col.description}
          url={col.url}
        />
      ))}
    </div>
  );
};

export default CollectionList;


