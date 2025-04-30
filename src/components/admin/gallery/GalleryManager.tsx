
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMockData } from '@/context/MockDataContext';
import { toast } from 'sonner';
import { GymGalleryImage } from '@/types';
import { ArrowLeft, ArrowRight, Edit, Trash, Upload } from 'lucide-react';

const GalleryManager: React.FC = () => {
  const { gymGalleryImages, uploadGymImage, deleteGymImage, updateGymImageOrder } = useMockData();
  const [images, setImages] = useState<GymGalleryImage[]>([]);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionText, setCaptionText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sort images by order
  React.useEffect(() => {
    setImages([...gymGalleryImages].sort((a, b) => a.order - b.order));
  }, [gymGalleryImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Max size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image is too large (max 5MB)');
      return;
    }
    
    try {
      await uploadGymImage(file);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    }
  };

  const handleMoveImage = async (imageId: string, direction: 'up' | 'down') => {
    const currentImage = images.find(img => img.id === imageId);
    if (!currentImage) return;
    
    const currentOrder = currentImage.order;
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    
    // Validate new order is within bounds
    if (newOrder < 1 || newOrder > images.length) return;
    
    try {
      await updateGymImageOrder(imageId, newOrder);
    } catch (error) {
      toast.error('Failed to reorder images');
      console.error(error);
    }
  };
  
  const startEditingCaption = (image: GymGalleryImage) => {
    setEditingCaption(image.id);
    setCaptionText(image.caption || '');
  };
  
  const saveCaption = async (imageId: string) => {
    // In a real app, this would update the caption in the database
    // For this mock app, we'll just show a success message
    setEditingCaption(null);
    toast.success('Caption updated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gym Gallery Images</CardTitle>
        <CardDescription>
          Upload and manage images to showcase your gym on the front page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="image-upload">Upload New Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image-upload"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
              />
              <Button type="button" size="icon" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload JPG, PNG or WebP images (max 5MB)
            </p>
          </div>
          
          {/* Gallery Images List */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">Current Images ({images.length}/5)</h3>
            
            {images.length === 0 ? (
              <p className="text-muted-foreground">No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="flex items-center space-x-4 p-2 border rounded-md">
                    <div className="h-20 w-20 flex-shrink-0">
                      <img 
                        src={image.url} 
                        alt={image.caption || 'Gallery image'} 
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      {editingCaption === image.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={captionText}
                            onChange={(e) => setCaptionText(e.target.value)}
                            placeholder="Image caption"
                            className="flex-1"
                          />
                          <Button size="sm" onClick={() => saveCaption(image.id)}>Save</Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">
                            {image.caption || 'No caption'}
                          </p>
                          <Button variant="ghost" size="icon" onClick={() => startEditingCaption(image)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={image.order === 1}
                        onClick={() => handleMoveImage(image.id, 'up')}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={image.order === images.length}
                        onClick={() => handleMoveImage(image.id, 'down')}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteGymImage(image.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {images.length >= 5 && (
              <p className="text-amber-500 text-sm">
                Maximum of 5 images allowed. Delete existing images to upload more.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryManager;
