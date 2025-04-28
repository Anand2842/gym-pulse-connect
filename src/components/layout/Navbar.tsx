
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/context/MockDataContext';
import { LogOut, Menu, User, X } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useMockData();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-gym-primary to-gym-secondary flex items-center justify-center text-white font-bold">
                  GP
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">GymPulse</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {currentUser && (
              <>
                {currentUser.role === 'admin' ? (
                  <>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/admin/members" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Members
                    </Link>
                    <Link to="/admin/payments" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Payments
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/member/dashboard" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/member/check-in" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Check-In
                    </Link>
                    <Link to="/member/workout" className="text-gray-700 hover:text-gym-primary px-3 py-2 rounded-md text-sm font-medium">
                      Workouts
                    </Link>
                  </>
                )}

                <div className="ml-4 flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gym-primary flex items-center justify-center text-white">
                      <User size={16} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{currentUser.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="ml-2 text-gray-700"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            )}

            {!currentUser && (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="ml-2">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gym-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 sm:px-3">
            {currentUser && (
              <>
                {currentUser.role === 'admin' ? (
                  <>
                    <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/admin/members" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Members
                    </Link>
                    <Link to="/admin/payments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Payments
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/member/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/member/check-in" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Check-In
                    </Link>
                    <Link to="/member/workout" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                      Workouts
                    </Link>
                  </>
                )}

                <div className="px-3 py-2">
                  <div className="flex items-center pb-2">
                    <div className="h-8 w-8 rounded-full bg-gym-primary flex items-center justify-center text-white">
                      <User size={16} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{currentUser.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="w-full justify-center text-gray-700"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            )}

            {!currentUser && (
              <div className="px-3 py-2">
                <Link to="/login" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
