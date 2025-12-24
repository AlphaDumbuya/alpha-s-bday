import { PartyPopper } from 'lucide-react';

const PageHeader = () => {
  const isBirthdayToday = () => {
    const today = new Date();
    const birthDate = new Date("2025-12-26");
    return today.getDate() === birthDate.getDate() && 
           today.getMonth() === birthDate.getMonth();
  };

  const birthdayMessage = isBirthdayToday() 
    ? "Happy 3rd Birthday!" 
    : "Get ready to celebrate Justious Samura Dumbuya's special day! Turning 3 soon!";

  return (
    <header className="py-6 sm:py-8 md:py-12 text-center w-full px-2 sm:px-4">
      <div className="inline-flex items-center justify-center mb-3 sm:mb-4 flex-wrap gap-2">
        <PartyPopper className="h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12 text-accent icon-glow animate-subtle-float" />
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-400 leading-tight">
          Birthday Blast!
        </h1>
        <PartyPopper className="h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12 text-accent icon-glow animate-subtle-float [animation-delay:-2.5s]" />
      </div>
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-lg lg:text-xl text-cyan-200/80 font-body leading-relaxed">
        <span className="font-semibold text-cyan-300">{birthdayMessage}</span>
      </p>
    </header>
  );
};

export default PageHeader;
