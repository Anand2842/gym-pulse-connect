
import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '@/components/auth/SignUpForm';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link to="/login">
          <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gym-primary transition-colors">
            <ChevronLeft className="mr-1" size={20} />
            <span>Back to Login</span>
          </Button>
        </Link>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="block mb-6 group">
            <div className="h-16 w-16 rounded-md bg-gradient-to-r from-gym-primary to-gym-secondary flex items-center justify-center text-white font-bold mx-auto transition-transform duration-200 group-hover:scale-110 group-hover:shadow-md">
              GP
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">GymPulse</h1>
          <p className="mt-2 text-sm text-gray-600">
            The simple gym management solution for local gyms
          </p>
        </div>
        
        <div className="mt-8">
          <SignUpForm />
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-gym-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
