// src/components/custom/CountdownTimer.tsx
"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return null; // Birthday has arrived or passed
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initial calculation after mount
    setTimeLeft(calculateTimeLeft());
  }, []);
  
  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient, targetDate]);


  if (!isClient) {
    // Render placeholder or null on server to avoid hydration mismatch
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center my-8 md:my-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 md:p-6 bg-primary/70 rounded-lg shadow-lg">
            <div className="text-4xl md:text-6xl font-bold text-accent animate-pulse">--</div>
            <div className="text-sm md:text-base uppercase text-muted-foreground">Loading...</div>
          </div>
        ))}
      </div>
    );
  }


  if (!timeLeft) {
    return (
      <div className="text-center my-8 md:my-12">
        <h2 className="text-4xl md:text-5xl font-bold text-accent animate-pulse-glow font-headline">
          Happy Birthday, Alpha!
        </h2>
        <p className="text-xl text-muted-foreground mt-2">The special day is here!</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center my-8 md:my-12 px-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="p-4 md:p-6 bg-primary/70 rounded-xl shadow-xl transform transition-all hover:scale-105" style={{backdropFilter: 'blur(5px)'}}>
          <div 
            className={`text-4xl sm:text-5xl md:text-6xl font-bold text-accent ${index === 3 ? 'animate-pulse-glow' : 'text-glow'}`}
            style={{ animationDelay: `${index * 0.1}s`}}
          >
            {unit.value < 10 ? `0${unit.value}` : unit.value}
          </div>
          <div className="text-xs sm:text-sm md:text-base uppercase text-muted-foreground mt-1 font-body">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
