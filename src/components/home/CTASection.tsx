
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gym-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Fitness Journey Today</h2>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Join Lifestyle Fitness Gym today and get your first month at 50% off with a complimentary fitness assessment
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1">₹1000</h3>
                <p className="text-white/80">Monthly</p>
              </div>
              <div className="text-center border-t md:border-t-0 md:border-l md:border-r border-white/20 py-3 md:py-0">
                <h3 className="text-2xl font-bold mb-1">₹2700</h3>
                <p className="text-white/80">Quarterly</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1">₹10000</h3>
                <p className="text-white/80">Yearly</p>
              </div>
            </div>
            
            <p className="text-sm mb-2 text-white/70">
              All plans include access to all facilities, basic classes, and fitness tracking
            </p>
          </div>
          
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-white bg-white text-gym-primary hover:bg-white/90">
              Become a Member <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
