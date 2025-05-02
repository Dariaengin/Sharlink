import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='light' expand='md' className='px-4 py-3'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800' }}
        >
          SharLinks <i className='bi bi-share' />
        </Navbar.Brand>

        <Nav className='ms-auto d-flex gap-3'>
          <Nav.Link as={Link} to='/profile'>
            <i className='bi bi-person-circle me-1' />
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to='/collection'>
            My Collection
          </Nav.Link>
          <Nav.Link as={Link} to='/login'>
            Login
          </Nav.Link>
          <Nav.Link as={Link} to='/signup'>
            Sign Up
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const NavigationBar = () => {
//   const isAuthenticated = !!localStorage.getItem('user'); 

//   return (
//     <Navbar bg='light' expand='md' className='px-4 py-3'>
//       <Container>
//         <Navbar.Brand
//           as={Link}
//           to='/'
//           style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800' }}
//         >
//           SharLinks <i className='bi bi-share' />
//         </Navbar.Brand>

//         <Nav className='ms-auto d-flex gap-3'>
//           {isAuthenticated ? (
//             <>
//               <Nav.Link as={Link} to='/profile'>
//                 <i className='bi bi-person-circle me-1' />
//                 Profile
//               </Nav.Link>
//               <Nav.Link as={Link} to='/collection'>
//                 My Collections
//               </Nav.Link>
// //        
// <button
// onClick={handleLogout}
// className='btn btn-outline-danger d-flex align-items-center gap-2'
// >
// <FaSignOutAlt />
// Log Out
// </button>
// </>
//           ) : (
//             <>
//               <Nav.Link as={Link} to='/login'>
//                 Login
//               </Nav.Link>
//               <Nav.Link as={Link} to='/signup'>
//                 Sign Up
//               </Nav.Link>
//             </>
//           )}
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;
