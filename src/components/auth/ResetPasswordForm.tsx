
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-1">
          Enter your email and we'll send you instructions to reset your password
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isSubmitted ? (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700">
            If an account exists with {email}, we've sent instructions to reset your password.
          </p>
          <p className="mt-2 text-sm text-green-600">
            Please check your email inbox and spam folder.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-colors focus:border-gym-primary"
              placeholder="Enter your email address"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gym-primary hover:bg-blue-600 transition-all hover:shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
          
          <div className="text-center mt-4">
            <a 
              href="/login" 
              className="text-sm text-gym-primary hover:underline"
            >
              Return to login
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
