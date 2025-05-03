import React from 'react';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Log In to SharLinks</h1>
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
