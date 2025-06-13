
// src/components/custom/AlphaPhotoGallery.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

// Base list of gallery items with new URLs
const initialGalleryItems = [
  { id: 1, src: "https://code-alpha-image-gallary.vercel.app/alpha3.jpeg", alt: "Alpha's moment 1", dataAiHint: "portrait candid" },
  { id: 2, src: "https://code-alpha-image-gallary.vercel.app/alpha2.jpeg", alt: "Alpha's moment 2", dataAiHint: "casual outdoor" },
  { id: 3, src: "https://code-alpha-image-gallary.vercel.app/alpha1.jpeg", alt: "Alpha's moment 3", dataAiHint: "event group" },
  { id: 4, src: "https://code-alpha-image-gallary.vercel.app/alpha4.jpeg", alt: "Alpha's moment 4", dataAiHint: "portrait happy" },
  { id: 5, src: "https://code-alpha-image-gallary.vercel.app/alpha5.jpeg", alt: "Alpha's moment 5", dataAiHint: "activity fun" },
  { id: 6, src: "https://code-alpha-image-gallary.vercel.app/alpha6.jpeg", alt: "Alpha's moment 6", dataAiHint: "candid smile" },
  { id: 7, src: "https://code-alpha-image-gallary.vercel.app/alpha7.jpeg", alt: "Alpha's moment 7", dataAiHint: "group friends" },
  { id: 8, src: "https://code-alpha-image-gallary.vercel.app/alpha8.jpeg", alt: "Alpha's moment 8", dataAiHint: "outdoor scene" },
  { id: 9, src: "https://code-alpha-image-gallary.vercel.app/alpha10.jpeg", alt: "Alpha's moment 9", dataAiHint: "portrait style" },
  { id: 10, src: "https://code-alpha-image-gallary.vercel.app/alpha11.jpeg", alt: "Alpha's moment 10", dataAiHint: "event gathering" },
  { id: 11, src: "https://code-alpha-image-gallary.vercel.app/alpha12.jpeg", alt: "Alpha's moment 11", dataAiHint: "casual portrait" },
];

const AlphaPhotoGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledGalleryItems, setShuffledGalleryItems] = useState<typeof initialGalleryItems>([]);

  useEffect(() => {
    // Shuffle the gallery items once on component mount
    const shuffled = [...initialGalleryItems].sort(() => Math.random() - 0.5);
    setShuffledGalleryItems(shuffled);
    setCurrentIndex(0); // Reset index in case it was set before shuffle
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shuffledGalleryItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === shuffledGalleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!shuffledGalleryItems.length) {
    return (
        <Card className="w-full max-w-2xl overflow-hidden shadow-lg card-glow bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0 relative">
                <div className="aspect-w-16 aspect-h-9 bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Loading gallery...</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  const currentImage = shuffledGalleryItems[currentIndex];

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
      
      let extension = 'jpeg'; // Default to jpeg for these images
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
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
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
              priority={currentIndex === 0} // Prioritize the first image in the shuffled list
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
        Image {currentIndex + 1} of {shuffledGalleryItems.length}
      </p>
    </div>
  );
};

export default AlphaPhotoGallery;
