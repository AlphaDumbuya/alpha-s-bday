import { PartyPopper } from 'lucide-react';

const PageHeader = () => {
  return (
    <header className="py-8 md:py-12 text-center">
      <div className="inline-flex items-center justify-center mb-4">
        <PartyPopper className="h-10 w-10 md:h-12 md:w-12 mr-3 md:mr-4 text-accent icon-glow animate-subtle-float" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">
          Birthday Blast!
        </h1>
        <PartyPopper className="h-10 w-10 md:h-12 md:w-12 ml-3 md:ml-4 text-accent icon-glow animate-subtle-float [animation-delay:-2.5s]" />
      </div>
      <p className="mt-2 text-lg md:text-xl text-muted-foreground font-body">
        Get ready to celebrate <span className="font-semibold text-accent">Alpha Dumbuya&apos;s</span> special day!
      </p>
    </header>
  );
};

export default PageHeader;
