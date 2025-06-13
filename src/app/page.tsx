// src/app/page.tsx
"use client";

import { useState } from 'react';
import PageHeader from '@/components/custom/PageHeader';
import CountdownTimer from '@/components/custom/CountdownTimer';
import AIMessageGenerator from '@/components/custom/AIMessageGenerator';
import VirtualBirthdayCard from '@/components/custom/VirtualBirthdayCard';
import ShareButton from '@/components/custom/ShareButton';
import { Separator } from '@/components/ui/separator';
import { Gift } from 'lucide-react';


export default function BirthdayBlastPage() {
  const [generatedMessage, setGeneratedMessage] = useState(
    "Dearest Alpha,\n\nOn this special day, I'm sending you waves of joy and heartfelt wishes for a truly fantastic birthday! May this new year of life bring you endless happiness, exciting adventures, and continued success in all your endeavors.\n\nThank you for being an inspiration. Your passion and dedication shine brightly!\n\nCheers to you!"
  );
  const alphaPhotoUrl = "https://placehold.co/600x400.png";
  const targetDate = "2025-06-15T00:00:00"; // Alpha's Birthday

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 selection:bg-accent selection:text-accent-foreground">
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
            <AIMessageGenerator onMessageGenerated={setGeneratedMessage} />
          </div>
          <div className="md:col-span-7 lg:col-span-8 mt-8 md:mt-0">
            <VirtualBirthdayCard 
              message={generatedMessage} 
              photoUrl={alphaPhotoUrl} 
              alphaName="Alpha Dumbuya"
            />
          </div>
        </section>
        
        <Separator className="bg-border/30" />

        <section aria-labelledby="share-heading" className="text-center py-8">
          <h2 id="share-heading" className="text-2xl font-headline font-semibold mb-6 text-primary-foreground">
            Spread the Joy!
          </h2>
          <ShareButton />
        </section>
      </main>

      <footer className="w-full max-w-5xl mx-auto text-center py-8 mt-12 border-t border-border/30">
        <p className="text-sm text-muted-foreground font-body">
          Made with <Gift className="inline h-4 w-4 text-accent" /> for Alpha Dumbuya&apos;s Birthday!
        </p>
         <p className="text-xs text-muted-foreground/70 font-body mt-1">
          &copy; {new Date().getFullYear()} Birthday Blast Creators.
        </p>
      </footer>
    </div>
  );
}
