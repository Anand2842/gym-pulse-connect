
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeft } from 'lucide-react';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await updatePassword(password);
      
      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
        // Redirect after successful password update
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };
  
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
            Update your password
          </p>
        </div>
        
        <div className="mt-8">
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
            {isSuccess ? (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700">
                  Your password has been updated successfully!
                </p>
                <p className="mt-2 text-sm text-green-600">
                  Redirecting to login page...
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
                  <p className="text-gray-600 mt-1">Create a strong password for your account</p>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-colors focus:border-gym-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="transition-colors focus:border-gym-primary"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gym-primary hover:bg-blue-600 transition-all hover:shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
