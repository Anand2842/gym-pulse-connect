
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth';
import { useProfile } from '@/hooks/useProfile';
import { useAuthMethods } from '@/hooks/useAuthMethods';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { profile, setProfile, fetchProfile } = useProfile();
  const { signIn, signUp, signOut: authSignOut, resetPassword, updatePassword, updateEmail } = useAuthMethods();

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
            // Use setTimeout to prevent Supabase deadlocks
            setTimeout(() => {
              fetchProfile(currentSession.user.id);
            }, 0);
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
        try {
          const profileData = await fetchProfile(initialSession.user.id);
          if (!profileData) {
            console.warn('No profile found for user, attempting to create one');
            try {
              // Try to create a profile if it doesn't exist
              const { error: createError } = await supabase.from('profiles').insert({
                id: initialSession.user.id,
                first_name: initialSession.user.user_metadata.first_name || '',
                last_name: initialSession.user.user_metadata.last_name || '',
                phone: initialSession.user.user_metadata.phone || null
              });
              
              if (createError) {
                console.error('Error creating profile:', createError);
              } else {
                // Refetch profile after creation
                await fetchProfile(initialSession.user.id);
              }
            } catch (error) {
              console.error('Error creating profile:', error);
            }
          }
        } catch (error) {
          console.error('Error during profile initialization:', error);
        }
      }
      
      setLoading(false);
      
      // Clean up subscription
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    await fetchProfile(user.id);
  };
  
  // Custom sign out that also clears profile
  const signOut = async () => {
    await authSignOut();
    setProfile(null);
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const value: AuthContextType = {
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
