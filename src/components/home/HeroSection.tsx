
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMockData } from '@/context/MockDataContext';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';

const HeroSection = () => {
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
    <section className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')", 
          filter: "brightness(0.7)"
        }}
      ></div>

      <div className="container mx-auto px-4 py-24 sm:py-32 md:py-40 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
            Welcome to <span className="text-gym-secondary">Lifestyle</span> <span className="text-gym-primary">Fitness</span> Gym
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transform your body, elevate your mind, and embrace a healthier lifestyle with our state-of-the-art facilities and expert trainers
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to={redirectToRightDashboard()}>
              <Button size="lg" className="bg-gym-primary hover:bg-blue-600 text-white font-semibold">
                {currentUser ? 'Go to Dashboard' : 'Start Your Journey'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {currentUser ? 'My Account' : 'Sign In'}
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-center gap-3">
              <Users className="h-6 w-6 text-gym-secondary" />
              <div className="text-left">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-white/80">Active Members</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-center gap-3">
              <Calendar className="h-6 w-6 text-gym-secondary" />
              <div className="text-left">
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-sm text-white/80">Classes Weekly</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-gym-secondary" />
              <div className="text-left">
                <p className="text-2xl font-bold text-white">5:00 - 23:00</p>
                <p className="text-sm text-white/80">Opening Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
