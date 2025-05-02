import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LinkPage = () => {
  const { linkId } = useParams(); // получаем linkId из URL
  const [link, setLink] = useState(null);

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

  if (!link) return <p>Loading link...</p>;

  return (
    <div className='container mt-4'>
      <h1 className='text-center'>{link.title}</h1>
      <p className='text-center'>{link.description}</p>
      <div className='text-center'>
        <a
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary'
        >
          Visit Link
        </a>
      </div>

      {/* Comments Section */}
      {/* <h2 className='mt-4'>Comments:</h2>
      <div className='mt-3'>
     
        <textarea
          className='form-control'
          rows='3'
          placeholder='Add your comment...'
        ></textarea>
        <button className='btn btn-primary mt-2'>Submit</button>
            <div className='mt-3'>
          <p>
            <strong>User1</strong> (2025-05-01): Great resource!
          </p>
          <p>
            <strong>User2</strong> (2025-05-02): Very helpful, thanks!
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default LinkPage;
