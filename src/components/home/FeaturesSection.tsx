
import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expert Trainers",
      description: "Our certified fitness experts will guide you through personalized training plans to help you achieve your fitness goals faster and safer."
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Flexible Hours",
      description: "With extended opening hours from early morning to late night, we accommodate your busy schedule and help you maintain consistency."
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Holistic Wellness",
      description: "Beyond physical fitness, we focus on overall well-being with nutrition guidance, recovery sessions, and mental health support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-gym-primary">Lifestyle Fitness</span> Gym?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're more than just a gym — we're a community dedicated to helping you achieve your fitness goals and transform your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-5 text-gym-primary bg-blue-50 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
