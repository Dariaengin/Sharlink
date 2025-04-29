import React from 'react';
import Header from '../components/common/Header';
import SignUpForm from '../components/auth/SignUpForm';
import Footer from '../components/common/Footer'; // Optional: Can add Footer if needed

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showSignUp={false} showLogin={true} /> {/* Show Login link, hide Sign Up link */}
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Create Your SharLinks Account</h1>
          <SignUpForm />
        </div>
      </main>
      { <Footer /> }
    </div>
  );
};

export default SignUpPage;
