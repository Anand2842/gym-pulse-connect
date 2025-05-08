
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; phone?: string }) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null; data: any | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: any | null; data: any | null }>;
  updateEmail: (newEmail: string) => Promise<{ error: any | null; data: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize: Get session and set up listener
    const initializeAuth = async () => {
      setLoading(true);
      
      // Set up auth listener FIRST to prevent missing auth events
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          console.log('Auth state change:', event, currentSession ? 'session exists' : 'no session');
          setSession(currentSession);
          setUser(currentSession?.user || null);
          
          if (event === 'SIGNED_IN' && currentSession?.user) {
            await fetchProfile(currentSession.user.id);
          } else if (event === 'SIGNED_OUT') {
            setProfile(null);
          }
        }
      );
      
      // THEN check for existing session
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user || null);
      
      if (initialSession?.user) {
        await fetchProfile(initialSession.user.id);
      }
      
      setLoading(false);
      
      // Clean up subscription
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Fetch user profile from profiles table
  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };
  
  // Refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    await fetchProfile(user.id);
  };
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return { error, data: null };
      }
      
      console.log('Sign in successful');
      return { data, error: null };
    } catch (error: any) {
      console.error('Exception in sign in:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, data: null };
    }
  };
  
  // Sign up with email and password
  const signUp = async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; phone?: string }
  ) => {
    try {
      console.log('Signing up user:', email);
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone || null
          }
        }
      });
      
      if (error) {
        console.error('Sign up error:', error.message);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        return { error, data: null };
      }
      
      // Update profile directly if needed
      if (data.user) {
        console.log('User created, ensuring profile is set up');
        await supabase
          .from('profiles')
          .update({
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone || null
          })
          .eq('id', data.user.id);
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email for verification.",
        variant: "default"
      });
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Exception in sign up:', error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, data: null };
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (!error) {
        toast({
          title: "Password reset email sent",
          description: "Please check your email for the reset link.",
        });
      } else {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
      }
      
      return { data, error };
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, data: null };
    }
  };
  
  // Update password
  const updatePassword = async (newPassword: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (!error) {
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
        });
      } else {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive"
        });
      }
      
      return { data, error };
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, data: null };
    }
  };
  
  // Update email
  const updateEmail = async (newEmail: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      if (!error) {
        toast({
          title: "Email update initiated",
          description: "Please check your new email for verification.",
        });
      } else {
        toast({
          title: "Email update failed",
          description: error.message,
          variant: "destructive"
        });
      }
      
      return { data, error };
    } catch (error: any) {
      toast({
        title: "Email update failed",
        description: error.message,
        variant: "destructive"
      });
      return { error, data: null };
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    resetPassword,
    updatePassword,
    updateEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
