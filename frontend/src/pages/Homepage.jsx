import React from 'react';

import SearchBar from '../components/common/SearchBar';

const Homepage = () => {
  return (
    <div>
      <h1 className='text-center mb-4'>Welcome to SharLinks</h1>
      <SearchBar />
      <section className='mt-4'>
        <h2 className='text-center mb-3'>Top Collections</h2>
      </section>
      <section className='mt-4'>
        <h2 className='text-center mb-3'>Top Links</h2>
      </section>
    </div>
  );
};
export default Homepage;
