
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '@/context/MockDataContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useMockData();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/member/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - Quick login buttons
  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password'); // Not actually used in the mock auth
    
    setIsLoading(true);
    try {
      const user = await login(demoEmail, 'password');
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/member/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
      <div className="text-center mb-6">
        <div className="h-12 w-12 rounded-md bg-gradient-to-r from-gym-primary to-gym-secondary flex items-center justify-center text-white font-bold mx-auto mb-2">
          GP
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to GymPulse</h2>
        <p className="text-gray-600 mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-colors focus:border-gym-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="transition-colors focus:border-gym-primary"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gym-primary hover:bg-blue-600 transition-all hover:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => handleQuickLogin('admin@example.com')}
            className="text-sm transition-colors hover:bg-gym-primary/10"
          >
            Demo as Admin
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => handleQuickLogin('raj@example.com')}
            className="text-sm transition-colors hover:bg-gym-primary/10"
          >
            Demo as Member
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
