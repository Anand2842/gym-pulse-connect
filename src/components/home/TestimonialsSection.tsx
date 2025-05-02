
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Member since 2021",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
    content: "Joining Lifestyle Fitness Gym was the best decision I made for my health. The trainers are incredibly supportive, and I've lost 15 kg in just six months!",
    rating: 5
  },
  {
    name: "Raj Patel",
    role: "Member since 2022",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    content: "The equipment is top-notch and always well-maintained. I appreciate the clean environment and the friendly staff who are always ready to help.",
    rating: 5
  },
  {
    name: "Anita Desai",
    role: "Member since 2020",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop",
    content: "I've been to many gyms, but Lifestyle Fitness stands out with its community feel and comprehensive fitness programs. The results speak for themselves!",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from real members who have transformed their lives with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
