
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useProfile = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
        setLoading(false);
        return null;
      }
      
      console.log('Profile fetched:', data);
      setProfile(data);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error('Exception in fetchProfile:', error);
      setError(error.message);
      setLoading(false);
      return null;
    }
  };

  return { profile, setProfile, fetchProfile, loading, error };
};
