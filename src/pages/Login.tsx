
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { ChevronLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gym-primary transition-colors">
            <ChevronLeft className="mr-1" size={20} />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/" className="block mb-6 group">
                  <div className="h-16 w-16 rounded-md bg-gradient-to-r from-gym-primary to-gym-secondary flex items-center justify-center text-white font-bold mx-auto transition-transform duration-200 group-hover:scale-110 group-hover:shadow-md">
                    GP
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-gym-primary transition-colors mt-1">Back to Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to homepage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
