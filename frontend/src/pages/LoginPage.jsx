import React from 'react';
import Header from '../components/common/Header';
import LoginForm from '../components/auth/LoginForm';
import Footer from '../components/common/Footer'; 

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showLogin={false} showSignUp={true} /> {/* Show Sign Up link, hide Login link */}
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Log In to SharLinks</h1>
          <LoginForm />
        </div>
      </main>
      { <Footer /> }
    </div>
  );
};

export default LoginPage;
