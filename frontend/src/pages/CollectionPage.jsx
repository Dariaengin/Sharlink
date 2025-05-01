// src/pages/CollectionPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
// import AddLinkForm from '../components/collection/AddLinkForm';
import LinkCard from '../components/collection/LinkCard';
import CollectionList from '../components/profile/CollectionList';


const initialLinks = [
  {
    id: 1,
    title: 'React Documentation',
    url: 'https://reactjs.org',
    description: 'The official React documentation',
    coverImage: 'https://logo.clearbit.com/reactjs.org',
  },
  {
    id: 2,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Best reference for HTML/CSS/JS',
    coverImage: 'https://logo.clearbit.com/developer.mozilla.org',
  },
];

const CollectionPage = () => {
  const { collectionId } = useParams();
  const [links, setLinks] = useState(initialLinks);

  const handleAddLink = (newLink) => {
    setLinks((prev) => [...prev, { id: Date.now(), ...newLink }]);
  };

  const handleDelete = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Collection #{collectionId}</h2>
          <AddLinkForm onAdd={handleAddLink} />
        </div> */}

        <div className="row">
          {links.map((link) => (
            <div
              key={link.id}
              className="col-md-3 col-sm-6 mb-4 d-flex align-items-stretch"
            >
              <LinkCard
                title={link.title}
                coverImage={link.coverImage}
                description={link.description}
                url={link.url}
                onDelete={() => handleDelete(link.id)}
                showControls={true}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;
