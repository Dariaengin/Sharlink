import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';

import AddLinkForm from './components/collection/AddLinkForm'; //added
import EditLinkForm from './components/collection/EditLinkForm'; //added

import { Container, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <main>
      <Container fluid='md' className='py-4'>
        <Routes>
          {/* Home route */}
          <Route path='/' element={<Homepage />} />

          {/* Route for adding a link to a collection */}
          <Route
            path='/collection/:collectionId/add-link'
            element={<AddLinkForm />}
          />

          {/* Route for editing a link */}
          <Route path='/link/:linkId/edit' element={<EditLinkForm />} />

          {/* Catch-all route for 404 (Not Found) */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;