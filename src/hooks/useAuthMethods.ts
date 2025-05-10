
import { useToast } from '@/components/ui/use-toast';
import { UserData } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

export const useAuthMethods = () => {
  const { toast } = useToast();

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
  
  const signUp = async (
    email: string, 
    password: string, 
    userData: UserData
  ) => {
    try {
      console.log('Signing up user:', email, 'with data:', userData);
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
      
      console.log('User created successfully:', data);
      
      toast({
        title: "Registration successful",
        description: "You can now sign in with your credentials.",
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
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
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

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateEmail
  };
};
