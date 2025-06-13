// src/components/custom/ShareButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  messageToShare: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ messageToShare }) => {
  const [buttonText, setButtonText] = useState('Share Page Link');
  const [Icon, setIcon] = useState(() => Share2); // Initial icon for general share
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  const showTemporaryState = (text: string, NewIcon: React.ElementType, duration = 2000, targetButton: 'general' | 'whatsapp' = 'general') => {
    if (targetButton === 'general') {
      setButtonText(text);
      setIcon(() => NewIcon);
      setTimeout(() => {
        setButtonText('Share Page Link');
        setIcon(() => Share2);
      }, duration);
    }
    // For WhatsApp, toast is sufficient, no button text change needed for that one
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

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday Alpha Dumbuya!',
          text: 'Check out this special birthday page I made for Alpha!',
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

  const handleShareOnWhatsApp = () => {
    const phoneNumber = "23278261892"; // Make sure no '+' or spaces
    if (!messageToShare) {
      toast({
        title: "No Message",
        description: "There's no message to share yet.",
        variant: "destructive",
      });
      return;
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageToShare)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "WhatsApp Opened",
      description: "Your message is ready to be sent to Alpha!",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <Button 
        onClick={handleSharePage} 
        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent font-headline text-lg py-6 px-8"
        aria-label="Share Alpha's Birthday Page Link"
        disabled={!pageUrl}
      >
        <Icon className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
      <Button 
        onClick={handleShareOnWhatsApp} 
        variant="outline"
        className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10 focus:ring-accent font-headline text-lg py-6 px-8"
        aria-label="Send birthday message to Alpha via WhatsApp"
      >
        <Send className="mr-2 h-5 w-5" />
        Send to Alpha (WhatsApp)
      </Button>
    </div>
  );
};

export default ShareButton;
