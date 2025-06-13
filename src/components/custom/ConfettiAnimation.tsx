// src/components/custom/ConfettiAnimation.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiPieceProps {
  id: number;
  style: React.CSSProperties;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ style }) => {
  return <div className="confetti-piece" style={style}></div>;
};

const ConfettiAnimation: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPieceProps[]>([]);

  useEffect(() => {
    const numPieces = 50; // Number of confetti pieces
    const newPieces: ConfettiPieceProps[] = [];
    const colors = ['var(--accent)', 'var(--primary)', '#FFC0CB', '#FFFF00']; // Accent, primary, pink, yellow

    for (let i = 0; i < numPieces; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newPieces.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 5}s`, // Fall duration: 5-8 seconds
          animationDelay: `${Math.random() * 5}s`, // Start falling at different times
          backgroundColor: color,
          transform: `rotate(${Math.random() * 360}deg)`,
          width: `${Math.random() * 5 + 5}px`, // Width: 5-10px
          height: `${Math.random() * 10 + 10}px`, // Height: 10-20px
        },
      });
    }
    setPieces(newPieces);
  }, []);

  if (!pieces.length) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} id={piece.id} style={piece.style} />
      ))}
    </div>
  );
};

export default ConfettiAnimation;
