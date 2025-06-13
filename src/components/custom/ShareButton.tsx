// src/components/custom/ShareButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react'; // Removed Send icon
import { useToast } from '@/hooks/use-toast';

// WhatsApp SVG Icon Component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.173.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/>
  </svg>
);


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
    const phoneNumber = "23278261892"; 
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
        <WhatsAppIcon className="mr-2 h-5 w-5" />
        Send to Alpha (WhatsApp)
      </Button>
    </div>
  );
};

export default ShareButton;
