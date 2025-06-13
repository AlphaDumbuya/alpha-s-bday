
// src/components/custom/AlphaPhotoGallery.tsx
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
      {galleryItems.map((item) => (
        <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 card-glow bg-card/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="aspect-w-4 aspect-h-3">
              <Image
                src={item.src}
                alt={item.alt}
                width={600} // Provide base width, aspect ratio will handle height
                height={450} // Provide base height
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                data-ai-hint={item.dataAiHint}
              />
            </div>
          </CardContent>
          {/* You could add captions here if needed using CardFooter or similar */}
        </Card>
      ))}
    </div>
  );
};

export default AlphaPhotoGallery;
