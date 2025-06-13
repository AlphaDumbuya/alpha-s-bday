// src/components/custom/ShareButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShareButton: React.FC = () => {
  const [buttonText, setButtonText] = useState('Share Birthday Card');
  const [Icon, setIcon] = useState(() => Share2); // Initial icon
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    // This effect runs only on the client after hydration
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  const showTemporaryState = (text: string, NewIcon: React.ElementType, duration = 2000) => {
    setButtonText(text);
    setIcon(() => NewIcon);
    setTimeout(() => {
      setButtonText('Share Birthday Card');
      setIcon(() => Share2);
    }, duration);
  };

  const handleShare = async () => {
    if (!pageUrl) {
       toast({
        title: "Error",
        description: "Page URL not available yet. Please try again shortly.",
        variant: "destructive",
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday Alpha Dumbuya!',
          text: 'Check out this special birthday page I made for Alpha!',
          url: pageUrl,
        });
        showTemporaryState('Shared!', Check);
      } catch (error) {
        // If user cancels share or error occurs, do nothing or log error
        // console.error('Error sharing:', error);
        // Fallback to copy link if share API fails or is cancelled by user
        // No, let's not automatically copy, user might not want that
      }
    } else {
      // Fallback for browsers that don't support navigator.share: copy link
      navigator.clipboard.writeText(pageUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: "Share this link with friends and loved ones.",
        });
        showTemporaryState('Link Copied!', Copy);
      }).catch(err => {
        console.error('Failed to copy link:', err);
        toast({
          title: "Error",
          description: "Could not copy link to clipboard.",
          variant: "destructive",
        });
      });
    }
  };

  return (
    <Button 
      onClick={handleShare} 
      className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent font-headline text-lg py-6 px-8"
      aria-label="Share Alpha's Birthday Card"
      disabled={!pageUrl} // Disable button until URL is available
    >
      <Icon className="mr-2 h-5 w-5" />
      {buttonText}
    </Button>
  );
};

export default ShareButton;
