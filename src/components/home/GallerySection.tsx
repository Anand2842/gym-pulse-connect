
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useMockData } from '@/context/MockDataContext';
import { Skeleton } from "@/components/ui/skeleton";
import { GymGalleryImage } from '@/types';

const GallerySection = () => {
  const { gymGalleryImages } = useMockData();
  const [sortedImages, setSortedImages] = React.useState<GymGalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [imagesLoaded, setImagesLoaded] = React.useState<Record<string, boolean>>({});
  
  React.useEffect(() => {
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Facilities</h2>
            <p className="mt-4 text-lg text-gray-600">Loading our premium gym equipment and spaces...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sortedImages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Facilities</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our state-of-the-art equipment and spaces designed to elevate your workout experience
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {sortedImages.map((image) => (
                <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="overflow-hidden rounded-xl h-64 md:h-80 relative group">
                    {!imagesLoaded[image.id] && (
                      <Skeleton className="absolute inset-0 z-10" />
                    )}
                    <img 
                      src={image.url} 
                      alt={image.caption || 'Gym facilities'} 
                      className={`w-full h-full object-cover transition-all duration-500 
                        group-hover:scale-110 ${!imagesLoaded[image.id] ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => handleImageLoad(image.id)}
                    />
                    {image.caption && imagesLoaded[image.id] && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium text-sm">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="relative static transform-none mx-0 bg-gym-primary text-white hover:bg-gym-primary/90 border-none" />
              <CarouselNext className="relative static transform-none mx-0 bg-gym-primary text-white hover:bg-gym-primary/90 border-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
