import React, { useEffect, useState } from 'react';
import CollectionList from '../components/profile/CollectionList';

const CollectionsListPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('collections');
    if (stored) {
      setCollections(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6">All Collections</h2>
        <CollectionList collections={collections} />
      </main>
    </div>
  );
};

export default CollectionsListPage;
