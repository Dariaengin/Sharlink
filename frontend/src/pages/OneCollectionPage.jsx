import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/collection/LinkCard';

const OneCollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2100/api/collections/${collectionId}`
        );
        setCollection(res.data);
      } catch (err) {
        console.error('Failed to fetch collection:', err);
      }
    };

    const fetchLinks = async () => {
      try {
        const res = await axios.get(`http://localhost:2100/api/links`);
        const filteredLinks = res.data.filter(
          (link) => link.collectionId._id === collectionId
        );
        setLinks(filteredLinks);
      } catch (err) {
        console.error('Failed to fetch links:', err);
      }
    };

    fetchCollection();
    fetchLinks();
  }, [collectionId]);

  if (!collection) return <p>Loading collection...</p>;

  return (
    <div className='container mt-4'>
      <h1 className='text-center'>{collection.title}</h1>
      <p className='text-center'>{collection.description}</p>

      <h2 className='mt-5 mb-5'>Links in this Collection:</h2>
      <div className='row justify-content-center'>
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard
              key={link._id}
              title={link.title}
              description={link.description}
              url={`/link/${link._id}`}
            />
          ))
        ) : (
          <p className='text-center'>No links in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default OneCollectionPage;
