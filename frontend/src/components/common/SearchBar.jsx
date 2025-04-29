import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} className='d-flex align-items-center'>
      <InputGroup>
        <Form.Control
          type='text'
          placeholder='Search for links or collections'
          value={query}
          onChange={handleInputChange}
          aria-label='Search'
        />
        <Button type='submit' variant='primary'>
          <i className='bi bi-search' />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
