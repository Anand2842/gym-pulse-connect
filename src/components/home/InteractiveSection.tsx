
import React from 'react';
import BMICalculator from './BMICalculator';
import ClassSchedule from './ClassSchedule';

const InteractiveSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Plan Your Fitness Journey</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Use our tools to check your health metrics and find the perfect class for your fitness level
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BMICalculator />
          <ClassSchedule />
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;
