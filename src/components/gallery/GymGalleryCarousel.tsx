
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useMockData } from '@/context/MockDataContext';
import { GymGalleryImage } from '@/types';

const GymGalleryCarousel: React.FC = () => {
  const { gymGalleryImages } = useMockData();
  const [sortedImages, setSortedImages] = useState<GymGalleryImage[]>([]);
  
  useEffect(() => {
    const sorted = [...gymGalleryImages].sort((a, b) => a.order - b.order);
    setSortedImages(sorted);
  }, [gymGalleryImages]);
  
  if (sortedImages.length === 0) {
    return null;
  }
  
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent className="-ml-2 md:-ml-4">
        {sortedImages.map((image) => (
          <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.caption || 'Gym photo'} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center mt-4">
        <CarouselPrevious className="relative -left-0 mx-2" />
        <CarouselNext className="relative -right-0 mx-2" />
      </div>
    </Carousel>
  );
};

export default GymGalleryCarousel;
