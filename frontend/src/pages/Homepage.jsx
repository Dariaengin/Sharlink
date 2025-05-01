// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/common/SearchBar';
import TopCollections from '../components/collection/TopCollections';
import TopLinks from '../components/collection/TopLinks';

const API_KEY = import.meta.env.VITE_OPENGRAPH_API_KEY;
const BASIC_URL = 'https://opengraph.io/api/1.1/site/';

const Homepage = () => {
  const linksToDisplay = [
    'https://google.com',
    'https://facebook.com',
    'https://twitter.com',
    'https://youtube.com',
  ];

  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(
        linksToDisplay.map((link) =>
          axios.get(`${BASIC_URL}${encodeURIComponent(link)}?app_id=${API_KEY}`)
        )
      );
      const data = responses.map((response) => response.data);
      setFetchedData(data);
    } catch (error) {
      console.error('Error with data fetching:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    
    <div className='container mt-4'>
      <h1 className='text-center mb-4'>Welcome to SharLinks</h1>
    
  <SearchBar />
      {/* Top Collections Section */}
      <TopCollections />
      {/* Link Cards Section with fetched data */}
      <TopLinks linksData={fetchedData} />
    </div>
  );
};

export default Homepage;
