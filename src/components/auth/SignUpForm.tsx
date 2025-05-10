
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
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
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Signing up with details:', {
        email,
        firstName,
        lastName,
        phone: phone || undefined
      });
      
      const { error, data } = await signUp(email, password, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone || undefined
      });
      
      if (!error) {
        console.log('User created successfully:', data);
        
        // Find an existing gym to associate with
        const { data: existingGyms, error: gymsError } = await supabase
          .from('gyms')
          .select('id')
          .limit(1);
        
        if (gymsError) {
          console.error('Error finding gym:', gymsError);
        } else if (existingGyms && existingGyms.length > 0 && data?.user) {
          // Create a member record for the new user
          const { error: memberError } = await supabase
            .from('members')
            .insert({
              profile_id: data.user.id,
              gym_id: existingGyms[0].id,
              active: true
            });
            
          if (memberError) {
            console.error('Error creating member record:', memberError);
          } else {
            console.log('Successfully created member record for new user');
          }
        }
        
        toast({
          title: "Account created successfully",
          description: "You can now sign in with your credentials.",
          variant: "default"
        });
        
        // Redirect to login page
        navigate('/login?signup=success');
      } else {
        console.error('Signup error:', error);
        setError(error.message || 'Failed to sign up');
        
        // Check for specific error types
        if (error.message?.includes('User already registered')) {
          setError('This email is already registered. Please login instead.');
        } else if (error.message?.includes('Email')) {
          setError('Please check your email format and try again.');
        }
      }
    } catch (err: any) {
      console.error('Exception in sign up:', err);
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
        <p className="text-gray-600 mt-1">Sign up to join GymPulse</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="transition-colors focus:border-gym-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="transition-colors focus:border-gym-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-colors focus:border-gym-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="transition-colors focus:border-gym-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
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
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
