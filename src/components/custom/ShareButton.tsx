
// src/components/custom/ShareButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  messageToShare: string; // Kept for potential future use, though not used by current button
}

const ShareButton: React.FC<ShareButtonProps> = ({ messageToShare }) => {
  const [buttonText, setButtonText] = useState('Share Page Link');
  const [Icon, setIcon] = useState(() => Share2);
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  const showTemporaryState = (text: string, NewIcon: React.ElementType, duration = 2000) => {
    setButtonText(text);
    setIcon(() => NewIcon);
    setTimeout(() => {
      setButtonText('Share Page Link');
      setIcon(() => Share2);
    }, duration);
  };

  const handleSharePage = async () => {
    if (!pageUrl) {
       toast({
        title: "Error",
        description: "Page URL not available yet. Please try again shortly.",
        variant: "destructive",
      });
      return;
    }

    const shareTitle = "Happy Birthday Justious Samura Dumbuya!";
    const shareText = "You're invited to Justious Samura Dumbuya's Birthday Blast! Check out this special page for his celebration.";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: pageUrl,
        });
        showTemporaryState('Shared!', Check);
      } catch (error) {
        // User cancelled share or error occurred
      }
    } else {
      navigator.clipboard.writeText(pageUrl).then(() => {
        toast({
          title: "Link Copied!",
          description: "Page link copied to clipboard. Share it with friends!",
        });
        showTemporaryState('Link Copied!', Copy);
      }).catch(err => {
        console.error('Failed to copy link:', err);
        toast({
          title: "Error",
          description: "Could not copy page link to clipboard.",
          variant: "destructive",
        });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <Button
        onClick={handleSharePage}
        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent font-headline text-lg py-6 px-8"
        aria-label="Share Justious Samura Dumbuya's Birthday Page Link"
        disabled={!pageUrl}
      >
        <Icon className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
    </div>
  );
};

export default ShareButton;

