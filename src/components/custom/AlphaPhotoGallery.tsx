
// src/components/custom/AlphaPhotoGallery.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-2xl overflow-hidden shadow-lg card-glow bg-card/80 backdrop-blur-sm">
        <CardContent className="p-0 relative">
          <div className="aspect-w-16 aspect-h-9 bg-muted"> {/* Added bg-muted for placeholder area */}
            <Image
              key={currentImage.id} // Add key to help React differentiate images for transitions/updates
              src={currentImage.src}
              alt={currentImage.alt}
              width={800} // Increased base width for potentially larger display
              height={450} // Adjusted height to match 16:9 aspect ratio
              className="object-cover w-full h-full"
              data-ai-hint={currentImage.dataAiHint}
              priority={currentIndex === 0} // Prioritize loading the first image
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between w-full max-w-2xl mt-4">
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
