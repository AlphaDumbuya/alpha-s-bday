// src/components/custom/VirtualBirthdayCard.tsx
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Gift, CakeSlice, PartyPopper } from 'lucide-react';

interface VirtualBirthdayCardProps {
  message: string;
  photoUrl: string;
  alphaName?: string;
}

const VirtualBirthdayCard: React.FC<VirtualBirthdayCardProps> = ({
  message,
  photoUrl,
  alphaName = "Alpha Dumbuya",
}) => {
  return (
    <Card className="w-full shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm card-glow">
      <CardHeader className="p-0 relative">
        <Image
          src={photoUrl}
          alt={`Photo of ${alphaName}`}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          data-ai-hint="portrait person"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <CardTitle className="font-headline text-3xl text-primary-foreground">Happy Birthday, {alphaName}!</CardTitle>
          <CardDescription className="font-body text-primary-foreground/80">Here&apos;s a special message for you:</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="font-body text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {message}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4 pt-4 border-t border-border/50">
        <Gift className="h-6 w-6 text-accent icon-glow" />
        <CakeSlice className="h-6 w-6 text-accent icon-glow" />
        <PartyPopper className="h-6 w-6 text-accent icon-glow" />
      </CardFooter>
    </Card>
  );
};

export default VirtualBirthdayCard;
