import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';

import AddLinkForm from './components/collection/AddLinkForm'; //added
import EditLinkForm from './components/collection/EditLinkForm'; //added

import './App.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-grow-1 d-flex flex-column'>
          <Container fluid='md' className='py-4'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              
              {/* ✅ New route for adding a link to a collection */}
              <Route path='/collection/:collectionId/add-link' element={<AddLinkForm />} />

              {/* ✅ New route for editing a link */}
              <Route path='/link/:linkId/edit' element={<EditLinkForm />} />

              {/* Catch-all route for 404 (Not Found) */}
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// 1