import React from 'react';
import SearchBar from '../components/common/SearchBar';
import TopCollections from '../components/collection/TopCollections';
import TopLinks from '../components/collection/TopLinks';

const Homepage = () => {
  return (
    <div className='container mt-4'>
      <h1 className='text-center mb-4'>Welcome to SharLinks</h1>

      <SearchBar />
      <TopCollections />
      <TopLinks />
    </div>
  );
};

export default Homepage;
