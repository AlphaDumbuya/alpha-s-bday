
// src/app/page.tsx
"use client";

import { useState, useRef } from 'react';
import PageHeader from '@/components/custom/PageHeader';
import CountdownTimer from '@/components/custom/CountdownTimer';
import AIMessageGenerator from '@/components/custom/AIMessageGenerator';
import VirtualBirthdayCard from '@/components/custom/VirtualBirthdayCard';
import ShareButton from '@/components/custom/ShareButton';
import ConfettiAnimation from '@/components/custom/ConfettiAnimation';
import BirthdayQuiz from '@/components/custom/BirthdayQuiz';
import AlphaPhotoGallery from '@/components/custom/AlphaPhotoGallery'; // Import the new gallery component
import { Separator } from '@/components/ui/separator';
import { Gift, Users, Camera } from 'lucide-react'; // Added Camera icon
import { useToast } from '@/hooks/use-toast';


export default function BirthdayBlastPage() {
  const [generatedMessage, setGeneratedMessage] = useState(
    "Dearest Alpha,\n\nOn this special day, I'm sending you waves of joy and heartfelt wishes for a truly fantastic birthday! May this new year of life bring you endless happiness, exciting adventures, and continued success in all your endeavors.\n\nThank you for being an inspiration. Your passion and dedication shine brightly!\n\nCheers to you!"
  );
  const alphaPhotoUrl = "https://code-alpha-image-gallary.vercel.app/alpha.jpeg";
  const targetDate = "2025-06-15T00:00:00"; // Alpha's Birthday
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleShareCardMessageToWhatsApp = () => {
    const phoneNumber = "23278261892"; // Alpha's WhatsApp number
    if (!generatedMessage) {
      toast({
        title: "No Message",
        description: "There's no message to share yet.",
        variant: "destructive",
      });
      return;
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(generatedMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "WhatsApp Opened",
      description: "Your message is ready to be sent to Alpha!",
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 selection:bg-accent selection:text-accent-foreground relative">
      <ConfettiAnimation />
      <PageHeader />

      <main className="w-full max-w-5xl mx-auto space-y-12 md:space-y-16">
        <section aria-labelledby="countdown-heading">
          <h2 id="countdown-heading" className="sr-only">Birthday Countdown</h2>
          <CountdownTimer targetDate={targetDate} />
        </section>

        <Separator className="bg-border/30" />

        <section aria-labelledby="card-creation-heading" className="space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 items-start">
           <h2 id="card-creation-heading" className="sr-only">Create and View Birthday Card</h2>
          <div className="md:col-span-5 lg:col-span-4">
            <AIMessageGenerator 
              onMessageGenerated={setGeneratedMessage} 
              onGenerationCompleteScrollToRef={cardRef}
            />
          </div>
          <div className="md:col-span-7 lg:col-span-8 mt-8 md:mt-0" ref={cardRef}>
            <VirtualBirthdayCard 
              message={generatedMessage} 
              photoUrl={alphaPhotoUrl} 
              alphaName="Alpha Dumbuya"
              onShareCardViaWhatsApp={handleShareCardMessageToWhatsApp}
            />
          </div>
        </section>
        
        <Separator className="bg-border/30" />

        <section aria-labelledby="quiz-heading" className="py-8">
          <div className="text-center mb-8">
            <h2 id="quiz-heading" className="text-3xl font-headline font-bold mb-2 text-primary-foreground flex items-center justify-center">
              <Users className="mr-3 h-8 w-8 text-accent icon-glow" />
              How Well Do You Know Alpha? (The Joke Edition!)
            </h2>
            <p className="text-muted-foreground font-body">Test your knowledge with these fun facts!</p>
          </div>
          <BirthdayQuiz />
        </section>

        <Separator className="bg-border/30" />

        <section aria-labelledby="gallery-heading" className="py-8">
          <div className="text-center mb-8">
            <h2 id="gallery-heading" className="text-3xl font-headline font-bold mb-2 text-primary-foreground flex items-center justify-center">
              <Camera className="mr-3 h-8 w-8 text-accent icon-glow" />
              Alpha's Photo Moments
            </h2>
            <p className="text-muted-foreground font-body">A few snapshots to celebrate Alpha!</p>
          </div>
          <AlphaPhotoGallery />
        </section>

        <Separator className="bg-border/30" />

        <section aria-labelledby="share-heading" className="text-center py-8">
          <h2 id="share-heading" className="text-2xl font-headline font-semibold mb-6 text-primary-foreground">
            Spread the Joy!
          </h2>
          <ShareButton messageToShare={generatedMessage} />
        </section>
      </main>

      <footer className="w-full max-w-5xl mx-auto text-center py-8 mt-12 border-t border-border/30">
        <p className="text-sm text-muted-foreground font-body">
          Made with <Gift className="inline h-4 w-4 text-accent" /> and all our love for your special day, Alpha! 
          <br />
          From Salamatu & Elizabeth Fatu Dumbuya.
        </p>
         <p className="text-xs text-muted-foreground/70 font-body mt-1">
          &copy; {new Date().getFullYear()} Salamatu Dumbuya.
        </p>
        <p className="text-xs text-muted-foreground/70 font-body mt-1">
          Designed by Alpha Dumbuya.
        </p>
      </footer>
    </div>
  );
}
