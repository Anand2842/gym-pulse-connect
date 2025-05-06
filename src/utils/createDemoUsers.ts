
import { supabase } from '@/integrations/supabase/client';

// This function will be used to create demo users in development
export const createDemoUsers = async () => {
  try {
    // Check if demo admin exists
    const { data: adminExists } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'admin@example.com')
      .maybeSingle();
    
    // Create admin demo user if not exists
    if (!adminExists) {
      // First sign up the user
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
      } else if (adminAuthData.user) {
        // Update profile directly
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: 'Demo',
            last_name: 'Admin',
            phone: '+919876543210'
          })
          .eq('id', adminAuthData.user.id);
        
        if (profileError) {
          console.error('Error updating admin profile:', profileError);
        }
        
        // Create a gym for admin
        const { data: gym, error: gymError } = await supabase
          .from('gyms')
          .insert({
            name: 'Demo Fitness Center',
            address: '123 Fitness Street, Demo City',
            owner_id: adminAuthData.user.id
          })
          .select()
          .single();
        
        if (gymError) {
          console.error('Error creating demo gym:', gymError);
        }
      }
    }
    
    // Check if demo member exists
    const { data: memberExists } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'member@example.com')
      .maybeSingle();
    
    // Create member demo user if not exists
    if (!memberExists) {
      // First sign up the user
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
      } else if (memberAuthData.user) {
        // Update profile directly
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: 'Demo',
            last_name: 'Member',
            phone: '+919876543211'
          })
          .eq('id', memberAuthData.user.id);
        
        if (profileError) {
          console.error('Error updating member profile:', profileError);
        }
        
        // Find the gym to add the member to
        const { data: gym } = await supabase
          .from('gyms')
          .select('id')
          .eq('name', 'Demo Fitness Center')
          .single();
        
        if (gym) {
          // Add as member to the gym
          const { error: memberError } = await supabase
            .from('members')
            .insert({
              gym_id: gym.id,
              profile_id: memberAuthData.user.id,
              join_date: new Date().toISOString().split('T')[0],
              active: true
            });
          
          if (memberError) {
            console.error('Error adding demo member to gym:', memberError);
          }
        }
      }
    }
    
    console.log('Demo users setup completed');
  } catch (error) {
    console.error('Error in createDemoUsers:', error);
  }
};

// Use this function to create demo users in development
// You can call this from a component or from a specific page
// For example, you might want to add a button in the settings page for admins
