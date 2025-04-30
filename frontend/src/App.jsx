import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './pages/Homepage';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFound';

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
              {/* Other routes there */}
              <Route path='/*' element={<NotFound />} />
              {/* <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} /> */}
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
