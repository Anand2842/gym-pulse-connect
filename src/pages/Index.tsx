
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InteractiveSection from '@/components/home/InteractiveSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  // Add scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section > div').forEach((section) => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section > div').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <InteractiveSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
