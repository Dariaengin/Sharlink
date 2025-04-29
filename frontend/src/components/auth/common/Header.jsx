import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation

const Header = ({ showLogin = true, showSignUp = true }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">SharLinks</Link> {/* Link logo to homepage */}
      </div>
      <nav>
        {showLogin && <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>}
        {showSignUp && <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>}
      </nav>
    </header>
  );
};

export default Header;
