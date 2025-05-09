
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const signupSuccess = searchParams.get('signup') === 'success';
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (signupSuccess) {
      toast({
        title: "Account created successfully",
        description: "You can now sign in with your credentials.",
        variant: "default"
      });
    }
  }, [signupSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Attempting to sign in with:', email);
      const { error, data } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        setError(error.message || 'Failed to sign in');
        
        // Handle specific error cases
        if (error.message?.includes('Invalid login credentials')) {
          setError('Incorrect email or password. Please try again.');
        }
        return;
      }
      
      console.log('Login successful, checking user role...');
      
      // Check if the user is an admin or a member
      if (data?.user) {
        // Check if user is gym owner or staff (admin)
        const { data: gyms, error: gymsError } = await supabase
          .from('gyms')
          .select('id')
          .eq('owner_id', data.user.id);
        
        if (gymsError) {
          console.error('Error checking gym ownership:', gymsError);
        }
        
        if (gyms && gyms.length > 0) {
          // User is a gym owner
          console.log('User is a gym owner, redirecting to admin dashboard');
          navigate('/admin/dashboard');
          return;
        }
        
        const { data: staff, error: staffError } = await supabase
          .from('gym_staff')
          .select('id')
          .eq('staff_id', data.user.id);
        
        if (staffError) {
          console.error('Error checking staff status:', staffError);
        }
        
        if (staff && staff.length > 0) {
          // User is gym staff
          console.log('User is gym staff, redirecting to admin dashboard');
          navigate('/admin/dashboard');
          return;
        }
        
        // Check if user is a member
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('id')
          .eq('profile_id', data.user.id);
          
        if (memberError) {
          console.error('Error checking member status:', memberError);
        }
        
        if (memberData && memberData.length > 0) {
          // User is a gym member
          console.log('User is a gym member, redirecting to member dashboard');
          navigate('/member/dashboard');
          return;
        }
        
        // If we got here, the user exists but doesn't have a role yet
        console.log('User has no role assigned yet');
        toast({
          title: "Login successful",
          description: "Your account doesn't have a role assigned yet. Please contact the administrator.",
          variant: "default"
        });
        
        // Default to member dashboard
        navigate('/member/dashboard');
      }
    } catch (err: any) {
      console.error('Exception during login:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - Quick login buttons
  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password'); // Default password for demo accounts
    
    setIsLoading(true);
    try {
      console.log('Quick login with:', demoEmail);
      const { error, data } = await signIn(demoEmail, 'password');
      
      if (error) {
        console.error('Demo login error:', error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        setError(error.message);
        return;
      }
      
      console.log('Demo login successful, redirecting...');
      
      // Direct demo users to the appropriate dashboard
      if (demoEmail === 'admin@example.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/member/dashboard');
      }
    } catch (err: any) {
      console.error('Exception during demo login:', err);
      setError(err.message || 'Failed to sign in');
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

      {signupSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Account created successfully! You can now sign in.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

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
          <div className="flex justify-end">
            <Link
              to="/reset-password"
              className="text-xs text-gym-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gym-primary hover:bg-blue-600 transition-all hover:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gym-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
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
            onClick={() => handleQuickLogin('member@example.com')}
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
