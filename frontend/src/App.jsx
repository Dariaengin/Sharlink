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

import AddLinkForm from './components/collection/AddLinkForm';
import EditLinkForm from './components/collection/EditLinkForm';

import './App.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-grow-1 d-flex flex-column'>
          <Container fluid='md' className='py-4'>
            <Routes>
              {/* Homepage */}
              <Route path='/' element={<Homepage />} />

              {/* Profile and Collections */}
              <Route path='/collection' element={<CollectionsListPage />} />
              <Route path='/collection/:collectionId' element={<CollectionPage />} />

              {/* Link operations */}
              <Route path='/collection/:collectionId/add-link' element={<AddLinkForm />} />
              <Route path='/link/:linkId/edit' element={<EditLinkForm />} />

              {/* Catch-all for 404 */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
