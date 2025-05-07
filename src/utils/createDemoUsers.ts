
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@supabase/supabase-js';

// This function will be used to create demo users in development
export const createDemoUsers = async () => {
  try {
    // Check if demo admin exists using auth API instead of profiles table
    const { data: adminUsersData, error: adminListError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 10
    });
    
    if (adminListError) {
      console.error('Error listing users for admin check:', adminListError);
      return;
    }
    
    // Use specific type checking to ensure TypeScript understands the structure
    const adminExists = adminUsersData?.users && adminUsersData.users.some(user => 
      user.email === 'admin@example.com'
    );
    
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
        return;
      } 
      
      if (adminAuthData.user) {
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
          .select();
        
        if (gymError) {
          console.error('Error creating demo gym:', gymError);
        }
      }
    }
    
    // Check if demo member exists using auth API instead of profiles table
    const { data: memberUsersData, error: memberListError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 20
    });
    
    if (memberListError) {
      console.error('Error listing users for member check:', memberListError);
      return;
    }
    
    // Use specific type checking to ensure TypeScript understands the structure
    const memberExists = memberUsersData?.users && memberUsersData.users.some(user => 
      user.email === 'member@example.com'
    );
    
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
        return;
      }
      
      if (memberAuthData.user) {
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
        const { data: gyms, error: gymFetchError } = await supabase
          .from('gyms')
          .select('id')
          .eq('name', 'Demo Fitness Center');
        
        if (gymFetchError) {
          console.error('Error fetching gym:', gymFetchError);
        }
        
        if (gyms && gyms.length > 0) {
          // Add as member to the gym
          const { error: memberError } = await supabase
            .from('members')
            .insert({
              gym_id: gyms[0].id,
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
