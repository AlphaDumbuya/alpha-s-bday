
// src/app/page.tsx
"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/components/custom/PageHeader';
import CountdownTimer from '@/components/custom/CountdownTimer';
import AIMessageGenerator from '@/components/custom/AIMessageGenerator';
import VirtualBirthdayCard from '@/components/custom/VirtualBirthdayCard';
import ShareButton from '@/components/custom/ShareButton';
import ConfettiAnimation from '@/components/custom/ConfettiAnimation';
import BirthdayQuiz from '@/components/custom/BirthdayQuiz';
import AlphaPhotoGallery from '@/components/custom/AlphaPhotoGallery';
import { Separator } from '@/components/ui/separator';
import { Gift, Users, Camera, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function BirthdayBlastPage() {
  const [generatedMessage, setGeneratedMessage] = useState(
    "Happy 3rd Birthday, Justious! 🎉\n\nWishing you an absolutely amazing day filled with laughter, fun, and all your favorite things! You're such an awesome little legend, and we love your silly giggles, your big adventurous spirit, and the way you light up every room.\n\nHere's to more cake, more laughs, more playing, and endless fun! You deserve the BEST!\n\nHave a fantastic birthday! 🎂🎈🎊"
  );
  const alphaPhotoUrl = "https://code-alpha-image-gallary.vercel.app/alpha.jpeg";
  const targetDate = "2025-12-26T00:00:00"; // Justious's Birthday
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleShareCardMessageToWhatsApp = () => {
    const phoneNumber = "4915788816780";
    if (!generatedMessage) {
      toast({
        title: "No Message",
        description: "There's no message to share yet.",
        variant: "destructive",
      });
      return;
    }
    
    const shareMessage = `🎉 *Justious Samura Dumbuya's Birthday Celebration* 🎉\n\n${generatedMessage}\n\n💝 Join us in celebrating! 💝\n\nVisit: https://justious.vercel.app`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "🎊 Share Ready!",
      description: "WhatsApp opened! Send your birthday wishes to Justious now! 🎂",
    });
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen w-full p-2 sm:p-4 md:p-8 selection:bg-accent selection:text-accent-foreground relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Premium Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient blobs */}
        <motion.div 
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        {/* Additional floating blobs for more movement */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-300/15 to-transparent rounded-full blur-2xl"
          animate={{
            x: [-50, 50, -50],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-purple-300/15 to-transparent rounded-full blur-2xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <ConfettiAnimation />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-10"
      >
        <motion.div variants={itemVariants}>
          <PageHeader />
        </motion.div>

        <main className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 relative z-10 px-2 sm:px-4">
          {/* Countdown Section */}
          <motion.section variants={itemVariants} className="flex justify-center w-full">
            <CountdownTimer targetDate={targetDate} />
          </motion.section>

          <motion.div variants={itemVariants} className="w-full">
            <Separator className="bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </motion.div>

          {/* Featured Image Section */}
          <motion.section 
            variants={itemVariants}
            className="flex justify-center w-full px-2 sm:px-4"
          >
            <div className="relative w-full max-w-3xl h-auto rounded-2xl overflow-hidden shadow-2xl card-glow border border-accent/20">
              <Image 
                src="/special-message-bg-img.png"
                alt="Justious Samura Dumbuya"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.section>

          <motion.div variants={itemVariants} className="w-full">
            <Separator className="bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </motion.div>

          {/* Message Generation & Card Section */}
          <motion.section 
            variants={itemVariants}
            aria-labelledby="card-creation-heading" 
            className="space-y-6 sm:space-y-8 md:space-y-0 w-full md:grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start"
          >
            <h2 id="card-creation-heading" className="sr-only">Create and View Birthday Card</h2>
            <motion.div 
              className="w-full md:col-span-5 lg:col-span-4 px-1 sm:px-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AIMessageGenerator 
                onMessageGenerated={setGeneratedMessage} 
                onGenerationCompleteScrollToRef={cardRef}
              />
            </motion.div>
            <motion.div 
              className="w-full md:col-span-7 lg:col-span-8 mt-6 md:mt-0 px-1 sm:px-0" 
              ref={cardRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <VirtualBirthdayCard 
                message={generatedMessage} 
                photoUrl={alphaPhotoUrl} 
                alphaName="Justious Samura Dumbuya"
                onShareCardViaWhatsApp={handleShareCardMessageToWhatsApp}
              />
            </motion.div>
          </motion.section>
          
          <motion.div variants={itemVariants} className="w-full">
            <Separator className="bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </motion.div>

          {/* Quiz Section */}
          <motion.section 
            variants={itemVariants}
            aria-labelledby="quiz-heading" 
            className="py-6 sm:py-8 md:py-12 w-full px-1 sm:px-0"
          >
            <div className="text-center mb-6 sm:mb-8">
              <motion.h2 
                id="quiz-heading" 
                className="text-xl sm:text-2xl md:text-3xl font-headline font-bold mb-1 sm:mb-2 text-cyan-300 flex items-center justify-center flex-wrap"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-cyan-400 icon-glow" />
                <span className="text-center">Know Justious?</span>
              </motion.h2>
              <p className="text-blue-200/70 font-body text-xs sm:text-sm">(The Joke Edition!)</p>
            </div>
            <div className="px-1 sm:px-0">
              <BirthdayQuiz />
            </div>
          </motion.section>

          <motion.div variants={itemVariants} className="w-full">
            <Separator className="bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          </motion.div>

          {/* Gallery Section */}
          <motion.section 
            variants={itemVariants}
            aria-labelledby="share-heading" 
            className="text-center py-8 sm:py-10 md:py-12 w-full px-1 sm:px-0"
          >
            <motion.h2 
              id="share-heading" 
              className="text-xl sm:text-2xl md:text-3xl font-headline font-bold mb-6 sm:mb-8 text-cyan-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Spread the Joy!
            </motion.h2>
            <ShareButton messageToShare={generatedMessage} />
          </motion.section>
        </main>

        {/* Premium Footer */}
        <motion.footer 
          className="w-full max-w-5xl mx-auto text-center py-8 md:py-12 px-4 mt-16 border-t border-cyan-400/20 relative z-10 backdrop-blur-sm"
          variants={itemVariants}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-400 fill-red-400" />
            <p className="text-xs md:text-sm text-cyan-100 font-body">
              Made with love for your special day, Justious! 
            </p>
            <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-400 fill-red-400" />
          </motion.div>
          <p className="text-xs md:text-sm text-blue-200 font-body mb-2">
            From Uncle Alpha Dumbuya & Family
          </p>
          <p className="text-xs text-blue-300/70 font-body mt-3">
            &copy; {new Date().getFullYear()} Alpha Dumbuya.
          </p>
          <p className="text-xs text-blue-300/70 font-body mt-1">
            Designed with love for Justious Samura Dumbuya.
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}
