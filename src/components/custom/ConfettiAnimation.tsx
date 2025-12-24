// src/components/custom/ConfettiAnimation.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Cake, PartyPopper, Heart } from 'lucide-react';

interface ConfettiPieceProps {
  id: number;
  style: React.CSSProperties;
}

interface FloatingElementProps {
  id: number;
  icon: React.ReactNode;
  delay: number;
  duration: number;
  left: string;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ style }) => {
  return <div className="confetti-piece" style={style}></div>;
};

const FloatingElement: React.FC<FloatingElementProps> = ({ icon, delay, duration, left }) => {
  return (
    <motion.div
      className="absolute pointer-events-none text-cyan-300 opacity-70"
      style={{ left }}
      initial={{ y: "100vh", opacity: 0, rotate: 0 }}
      animate={{ 
        y: "-100vh", 
        opacity: [0, 1, 1, 0],
        rotate: [0, 360, 720],
        x: Math.sin(Math.random() * Math.PI) * 100,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {icon}
    </motion.div>
  );
};

const ConfettiAnimation: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([]);
  const [floatingElements, setFloatingElements] = useState<FloatingElementProps[]>([]);

  useEffect(() => {
    // Enhanced confetti with more pieces
    const numPieces = 150; // Increased from 50
    const newPieces: ConfettiPieceProps[] = [];
    const colors = ['#00D9FF', '#FF00FF', '#FFC0CB', '#FFD700', '#00FF00', '#FF6B9D', '#C06C84'];

    for (let i = 0; i < numPieces; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newPieces.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 3}s`, // Fall duration: 3-6 seconds
          animationDelay: `${Math.random() * 8}s`, // Start falling at different times
          backgroundColor: color,
          transform: `rotate(${Math.random() * 360}deg)`,
          width: `${Math.random() * 6 + 4}px`, // Width: 4-10px
          height: `${Math.random() * 12 + 8}px`, // Height: 8-20px
          boxShadow: `0 0 ${Math.random() * 8 + 4}px ${color}`,
        },
      });
    }
    setPieces(newPieces);

    // Floating birthday elements
    const icons = [
      { icon: <Gift size={32} />, symbol: 'gift' },
      { icon: <Cake size={32} />, symbol: 'cake' },
      { icon: <PartyPopper size={32} />, symbol: 'party' },
      { icon: <Sparkles size={32} />, symbol: 'sparkles' },
      { icon: <Heart size={32} />, symbol: 'heart' },
    ];

    const floatingEls: FloatingElementProps[] = [];
    for (let i = 0; i < 15; i++) {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      floatingEls.push({
        id: i,
        icon: randomIcon.icon,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        left: `${Math.random() * 100}%`,
      });
    }
    setFloatingElements(floatingEls);
  }, []);

  if (!pieces.length) {
    return null;
  }

  return (
    <>
      {/* Confetti pieces */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden">
        {pieces.map((piece) => (
          <ConfettiPiece key={piece.id} id={piece.id} style={piece.style} />
        ))}
      </div>

      {/* Floating birthday elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30 overflow-hidden">
        {floatingElements.map((el) => (
          <FloatingElement
            key={el.id}
            id={el.id}
            icon={el.icon}
            delay={el.delay}
            duration={el.duration}
            left={el.left}
          />
        ))}
      </div>
    </>
  );
};

export default ConfettiAnimation;
