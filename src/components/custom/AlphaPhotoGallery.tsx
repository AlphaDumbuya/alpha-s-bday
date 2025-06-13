
// src/components/custom/AlphaPhotoGallery.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    src: "https://placehold.co/600x400.png",
    alt: "Placeholder image of Alpha at an event",
    dataAiHint: "event celebration",
  },
  {
    id: 2,
    src: "https://placehold.co/600x450.png",
    alt: "Placeholder image of Alpha smiling",
    dataAiHint: "portrait smile",
  },
  {
    id: 3,
    src: "https://placehold.co/650x400.png",
    alt: "Placeholder image of Alpha with friends",
    dataAiHint: "friends group",
  },
  {
    id: 4,
    src: "https://placehold.co/550x400.png",
    alt: "Placeholder image of Alpha working",
    dataAiHint: "office computer",
  },
];

const AlphaPhotoGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!galleryItems.length) {
    return <p>No photos to display.</p>;
  }

  const currentImage = galleryItems[currentIndex];

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      const cleanedAlt = currentImage.alt.replace(/[^a-z0-9_]+/gi, '-').replace(/^-+|-+$/g, '');
      const filenameBase = cleanedAlt || `alpha-photo-${currentIndex + 1}`;
      
      // Try to get extension from src, default to blob type or png
      let extension = 'png'; // default
      const srcExtMatch = currentImage.src.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
      if (srcExtMatch && srcExtMatch[1]) {
        extension = srcExtMatch[1];
      } else if (blob.type) {
        const mimeExt = blob.type.split('/')[1];
        if (mimeExt) extension = mimeExt;
      }
      
      link.download = `${filenameBase}.${extension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up
    } catch (error) {
      console.error("Error downloading image:", error);
      // Fallback for restricted cross-origin or other errors: open in new tab
      const newWindow = window.open(currentImage.src, '_blank');
      if (newWindow) {
        newWindow.focus();
      } else {
        alert("Could not download or open the image. Please try right-clicking and saving.");
      }
    }
  };


  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-2xl overflow-hidden shadow-lg card-glow bg-card/80 backdrop-blur-sm">
        <CardContent className="p-0 relative">
          <div className="aspect-w-16 aspect-h-9 bg-muted">
            <Image
              key={currentImage.id}
              src={currentImage.src}
              alt={currentImage.alt}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              data-ai-hint={currentImage.dataAiHint}
              priority={currentIndex === 0}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center w-full max-w-2xl mt-4 space-x-3">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="bg-primary/70 hover:bg-primary/90 text-foreground"
          aria-label="Previous image"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="bg-accent/80 hover:bg-accent/95 text-accent-foreground"
          aria-label="Download current image"
        >
          <Download className="mr-2 h-5 w-5" />
          Download
        </Button>
        <Button
          onClick={goToNext}
          variant="outline"
          className="bg-primary/70 hover:bg-primary/90 text-foreground"
          aria-label="Next image"
        >
          Next
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground font-body">
        Image {currentIndex + 1} of {galleryItems.length}
      </p>
    </div>
  );
};

export default AlphaPhotoGallery;
