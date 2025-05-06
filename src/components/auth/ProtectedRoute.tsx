
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'member' | null;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole = null,
  redirectTo = '/login'
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gym-primary" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If a specific role is required, check it (requires profile to be loaded)
  if (requiredRole && profile) {
    // For now we're determining role by URL paths, but later we'll use DB roles
    const isAdmin = location.pathname.includes('/admin');
    const isMember = location.pathname.includes('/member');
    
    // Check if user is trying to access admin routes but is not an admin
    if (requiredRole === 'admin' && !isAdmin) {
      return <Navigate to="/member/dashboard" replace />;
    }
    
    // Check if user is trying to access member routes but should be an admin
    if (requiredRole === 'member' && !isMember) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // User is authenticated (and has the required role if specified)
  return <Outlet />;
};

export default ProtectedRoute;
