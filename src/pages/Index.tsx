
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/context/MockDataContext';
import GymGalleryCarousel from '@/components/gallery/GymGalleryCarousel';

const Index = () => {
  const { currentUser } = useMockData();

  const redirectToRightDashboard = () => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        return '/admin/dashboard';
      } else {
        return '/member/dashboard';
      }
    }
    return '/login';
  };

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-gym-primary to-gym-secondary py-20 px-4 sm:py-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            GymPulse
          </h1>
          <p className="mt-6 text-xl text-blue-50 max-w-2xl mx-auto">
            The simple, affordable solution for local gym management
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to={redirectToRightDashboard()}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {currentUser ? 'Go to Dashboard' : 'Get Started'}
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {currentUser ? 'My Account' : 'Login'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 px-4 sm:py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Gym Facilities
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at our state-of-the-art equipment and facilities
            </p>
          </div>
          <GymGalleryCarousel />
        </div>
      </section>

      <section className="py-12 px-4 sm:py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple Management for Local Gyms
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Replace your paper-based system with an easy-to-use digital solution for managing your gym
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-gym-primary mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0-3-3.85"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Member Management</h3>
              <p className="text-gray-600">
                Easily register new members, manage their profiles, and track their membership details
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-gym-secondary mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
              <p className="text-gray-600">
                Keep track of daily member check-ins with an easy-to-use digital attendance system
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-gym-accent mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
              <p className="text-gray-600">
                Track payments, manage subscriptions, and identify overdue accounts with ease
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to modernize your gym management?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Try GymPulse for free for one month - no strings attached
            </p>
            <div className="mt-8">
              <Link to="/login">
                <Button size="lg" className="bg-gym-primary hover:bg-blue-600">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple, affordable plans for gyms of all sizes
            </p>
          </div>

          <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gym-primary text-white p-6 text-center">
              <h3 className="text-2xl font-bold">Standard Plan</h3>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-4xl font-extrabold">₹300</span>
                <span className="text-xl font-medium ml-1">/month</span>
              </div>
              <p className="mt-2 text-blue-100">after ₹500 one-time setup fee</p>
            </div>
            <div className="bg-white p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unlimited members</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Attendance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Payment management</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Basic analytics</span>
                </li>
              </ul>

              <div className="mt-8 flex justify-center">
                <Link to="/login">
                  <Button className="w-full bg-gym-primary hover:bg-blue-600">
                    1 Month Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Optional add-ons available: WhatsApp Integration (+₹100/month), Advanced Analytics (+₹50/month)</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
