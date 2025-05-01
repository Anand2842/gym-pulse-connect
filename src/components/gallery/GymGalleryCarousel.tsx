
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
import { Skeleton } from "@/components/ui/skeleton";

const GymGalleryCarousel: React.FC = () => {
  const { gymGalleryImages } = useMockData();
  const [sortedImages, setSortedImages] = useState<GymGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const sorted = [...gymGalleryImages].sort((a, b) => a.order - b.order);
    setSortedImages(sorted);
    setLoading(gymGalleryImages.length === 0);
  }, [gymGalleryImages]);
  
  const handleImageLoad = (imageId: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageId]: true
    }));
  };
  
  const allImagesLoaded = sortedImages.every(img => imagesLoaded[img.id]);
  
  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <Skeleton className="w-full h-[300px] rounded-md" />
      </div>
    );
  }
  
  if (sortedImages.length === 0) {
    return null;
  }
  
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {sortedImages.map((image) => (
            <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                    {!imagesLoaded[image.id] && (
                      <Skeleton className="absolute inset-0 rounded-md" />
                    )}
                    <div className="relative w-full h-full overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.caption || 'Gym photo'} 
                        className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                          !imagesLoaded[image.id] ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => handleImageLoad(image.id)}
                      />
                      {image.caption && imagesLoaded[image.id] && (
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
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <CarouselPrevious className="relative static transform-none mx-0" />
          <CarouselNext className="relative static transform-none mx-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default GymGalleryCarousel;
