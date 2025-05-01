import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import CollectionPage from './pages/CollectionPage';
import CollectionsListPage from './pages/CollectionsListPage';

import NotFound from './pages/NotFound';

import AddLinkForm from './components/collection/AddLinkForm'; // added
import EditLinkForm from './components/collection/EditLinkForm'; // added

import './App.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-grow-1 d-flex flex-column'>
          <Container fluid='md' className='py-4'>
            <Routes>
              {/* Main routes from the main branch */}
              <Route path='/' element={<Homepage />} />
              <Route path="/profile" element={<ProfilePage />} /> 
              <Route path="/collection/:collectionId" element={<CollectionPage />} />
              <Route path="/collection" element={<CollectionsListPage />} />

              {/* New routes added in your branch */}
              <Route path='/collection/:collectionId/add-link' element={<AddLinkForm />} />
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