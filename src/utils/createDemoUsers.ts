
import { supabase } from '@/integrations/supabase/client';

// This function will be used to create demo users in development
export const createDemoUsers = async () => {
  try {
    console.log('Starting demo users setup...');
    
    // Check if demo users exist by attempting to sign in
    const adminExists = await checkUserExists('admin@example.com');
    console.log('Admin exists:', adminExists);
    
    // Create admin demo user if not exists
    if (!adminExists) {
      console.log('Creating admin demo user...');
      
      // Create user with signup
      const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
        email: 'admin@example.com',
        password: 'password',
        options: {
          data: {
            first_name: 'Demo',
            last_name: 'Admin',
            phone: '+919876543210'
          }
        }
      });
      
      if (adminAuthError) {
        console.error('Error creating admin demo user:', adminAuthError);
        return;
      } 
      
      if (adminAuthData.user) {
        console.log('Admin user created:', adminAuthData.user.id);
        
        // Create a gym for admin - wait briefly to ensure profile is created
        setTimeout(async () => {
          const { data: gym, error: gymError } = await supabase
            .from('gyms')
            .insert({
              name: 'Demo Fitness Center',
              address: '123 Fitness Street, Demo City',
              owner_id: adminAuthData.user!.id
            })
            .select();
          
          if (gymError) {
            console.error('Error creating demo gym:', gymError);
          } else {
            console.log('Demo gym created successfully:', gym);
          }
        }, 1000);
      }
    }
    
    // Check if demo member exists
    const memberExists = await checkUserExists('member@example.com');
    console.log('Member exists:', memberExists);
    
    // Create member demo user if not exists
    if (!memberExists) {
      console.log('Creating member demo user...');
      
      // Create user with signup
      const { data: memberAuthData, error: memberAuthError } = await supabase.auth.signUp({
        email: 'member@example.com',
        password: 'password',
        options: {
          data: {
            first_name: 'Demo',
            last_name: 'Member',
            phone: '+919876543211'
          }
        }
      });
      
      if (memberAuthError) {
        console.error('Error creating member demo user:', memberAuthError);
        return;
      }
      
      if (memberAuthData.user) {
        console.log('Member user created:', memberAuthData.user.id);
        
        // Find the gym to add the member to - wait briefly to ensure profile is created
        setTimeout(async () => {
          const { data: gyms, error: gymFetchError } = await supabase
            .from('gyms')
            .select('id')
            .eq('name', 'Demo Fitness Center');
          
          if (gymFetchError) {
            console.error('Error fetching gym:', gymFetchError);
          } else if (gyms && gyms.length > 0) {
            console.log('Found gym to add member to:', gyms[0].id);
            
            // Add as member to the gym
            const { error: memberError } = await supabase
              .from('members')
              .insert({
                gym_id: gyms[0].id,
                profile_id: memberAuthData.user!.id,
                join_date: new Date().toISOString().split('T')[0],
                active: true
              });
            
            if (memberError) {
              console.error('Error adding demo member to gym:', memberError);
            } else {
              console.log('Demo member added to gym successfully');
            }
          } else {
            console.error('No gym found to add member to');
          }
        }, 1000);
      }
    }
    
    console.log('Demo users setup completed');
  } catch (error) {
    console.error('Error in createDemoUsers:', error);
  }
};

// Helper function to check if a user exists by email
const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    // Try to sign in with email/password to see if user exists
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: 'password'
    });
    
    // If there's no error, the user exists
    if (!error) {
      // Sign out immediately
      await supabase.auth.signOut();
      return true;
    }
    
    // If error is "Invalid login credentials", the user might exist but password is wrong
    // For our purposes, we'll create the user anyway if login fails
    return false;
  } catch {
    return false;
  }
};
