
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="block mb-6">
            <div className="h-16 w-16 rounded-md bg-gradient-to-r from-gym-primary to-gym-secondary flex items-center justify-center text-white font-bold mx-auto">
              GP
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">GymPulse</h1>
          <p className="mt-2 text-sm text-gray-600">
            The simple gym management solution for local gyms
          </p>
        </div>
        
        <div className="mt-8">
          <LoginForm />
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account? Contact your gym administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
