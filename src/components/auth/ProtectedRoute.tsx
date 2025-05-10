
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'member' | null;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole = null,
  redirectTo = '/login'
}) => {
  const { user, profile, loading } = useAuth();
  const [isRoleVerified, setIsRoleVerified] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const verifyUserRole = async () => {
      if (!user || !requiredRole) {
        setIsRoleVerified(true);
        setIsRoleLoading(false);
        return;
      }
      
      try {
        setIsRoleLoading(true);
        
        if (requiredRole === 'admin') {
          // Check if user is a gym owner
          const { data: gyms, error: gymsError } = await supabase
            .from('gyms')
            .select('id')
            .eq('owner_id', user.id);
            
          if (!gymsError && gyms && gyms.length > 0) {
            setHasRequiredRole(true);
            setIsRoleVerified(true);
            setIsRoleLoading(false);
            return;
          }
          
          // Or check if user is gym staff
          const { data: staff, error: staffError } = await supabase
            .from('gym_staff')
            .select('id')
            .eq('staff_id', user.id);
            
          if (!staffError && staff && staff.length > 0) {
            setHasRequiredRole(true);
            setIsRoleVerified(true);
            setIsRoleLoading(false);
            return;
          }
          
          // If got here, user doesn't have admin role
          setHasRequiredRole(false);
          
        } else if (requiredRole === 'member') {
          // Check if user is a member
          const { data: members, error: membersError } = await supabase
            .from('members')
            .select('id')
            .eq('profile_id', user.id);
            
          if (!membersError && members && members.length > 0) {
            setHasRequiredRole(true);
            setIsRoleVerified(true);
            setIsRoleLoading(false);
            return;
          }
          
          // If we get here, check if we need to auto-assign member role
          // This is for users who sign up but don't have a role yet
          try {
            // Find an existing gym to associate with
            const { data: existingGyms } = await supabase
              .from('gyms')
              .select('id')
              .limit(1);
              
            if (existingGyms && existingGyms.length > 0) {
              const gymId = existingGyms[0].id;
              
              // Create a member record
              const { error: memberCreateError } = await supabase
                .from('members')
                .insert({
                  profile_id: user.id,
                  gym_id: gymId,
                  active: true,
                });
                
              if (memberCreateError) {
                console.error('Error auto-creating member record:', memberCreateError);
              } else {
                console.log('Successfully auto-created member record for user');
                toast({
                  title: "Member role assigned",
                  description: "You have been automatically assigned as a member.",
                  variant: "default"
                });
                setHasRequiredRole(true);
                setIsRoleVerified(true);
                setIsRoleLoading(false);
                return;
              }
            }
          } catch (err) {
            console.error('Error in auto-role assignment:', err);
          }
          
          // If got here, user doesn't have member role
          setHasRequiredRole(false);
        }
        
        setIsRoleVerified(true);
        
      } catch (error) {
        console.error('Error verifying user role:', error);
        setHasRequiredRole(false);
      } finally {
        setIsRoleLoading(false);
      }
    };
    
    if (user && requiredRole) {
      verifyUserRole();
    } else {
      setIsRoleVerified(true);
      setIsRoleLoading(false);
    }
  }, [user, requiredRole]);
  
  console.log('Protected route check:', { 
    user: user ? 'exists' : 'null', 
    profile: profile ? 'exists' : 'null',
    loading,
    isRoleLoading,
    isRoleVerified,
    hasRequiredRole,
    requiredRole,
    path: location.pathname
  });

  // Show loading state
  if (loading || isRoleLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gym-primary" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    console.log('User not authenticated, redirecting to', redirectTo);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If a specific role is required and verification is complete, check it
  if (requiredRole && isRoleVerified) {
    console.log('Role check required:', requiredRole, 'Has role:', hasRequiredRole);
    
    // If user doesn't have the required role, redirect them
    if (!hasRequiredRole) {
      // Redirect member trying to access admin area to member dashboard
      if (requiredRole === 'admin') {
        console.log('Admin role required but user is not an admin');
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page. Redirecting to member dashboard.",
          variant: "destructive",
        });
        return <Navigate to="/member/dashboard" replace />;
      }
      
      // Redirect admin trying to access member area to admin dashboard
      if (requiredRole === 'member') {
        console.log('Member role required but user is not a member');
        return <Navigate to="/admin/dashboard" replace />;
      }
    }
  }

  // User is authenticated and has the required role (if specified)
  console.log('Access granted to protected route');
  return <Outlet />;
};

export default ProtectedRoute;
