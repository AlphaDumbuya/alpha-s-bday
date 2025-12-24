
// src/components/custom/VirtualBirthdayCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Gift, CakeSlice, PartyPopper, Sparkles } from 'lucide-react';

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

interface VirtualBirthdayCardProps {
  message: string;
  photoUrl: string;
  alphaName?: string;
  onShareCardViaWhatsApp?: () => void;
}

const VirtualBirthdayCard: React.FC<VirtualBirthdayCardProps> = ({
  message,
  photoUrl,
  alphaName = "Alpha Dumbuya",
  onShareCardViaWhatsApp,
}) => {
  return (
    <Card className="w-full shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm card-glow border border-accent/20">
      <CardHeader className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-cyan-400/10 to-blue-400/10">
        <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400 mb-3" />
        <CardTitle className="font-headline text-xl sm:text-2xl md:text-3xl text-primary-foreground leading-tight">Happy Birthday, {alphaName}!</CardTitle>
        <CardDescription className="font-body text-xs sm:text-sm text-primary-foreground/80 mt-2">Here&apos;s a special message for you:</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
        <p className="font-body text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {message}
        </p>
        {onShareCardViaWhatsApp && (
          <div className="mt-6 sm:mt-8 text-left pt-4 sm:pt-6 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground/80 mb-2 sm:mb-3 font-body font-semibold">Send your wishes to Justious on WhatsApp:</p>
            <Button 
              variant="default" 
              size="sm" 
              onClick={onShareCardViaWhatsApp} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent font-body font-semibold items-center w-full text-xs sm:text-sm"
              aria-label="Share birthday wishes to Justious via WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>Share Wishes</span>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-border/50 bg-card/50 flex-wrap">
        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-accent icon-glow mb-1 animate-bounce" />
            <span className="text-xs text-muted-foreground font-body">Gift</span>
          </div>
          <div className="flex flex-col items-center">
            <CakeSlice className="h-5 w-5 sm:h-6 sm:w-6 text-accent icon-glow mb-1 animate-bounce [animation-delay:0.2s]" />
            <span className="text-xs text-muted-foreground font-body">Cake</span>
          </div>
          <div className="flex flex-col items-center">
            <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6 text-accent icon-glow mb-1 animate-bounce [animation-delay:0.4s]" />
            <span className="text-xs text-muted-foreground font-body">Party</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VirtualBirthdayCard;
