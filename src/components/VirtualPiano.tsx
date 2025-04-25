
import React, { useState, useMemo } from 'react';
import Piano from './Piano';
import StatusBar from './StatusBar';
import KeyboardMapping from './KeyboardMapping';
import { type OctaveShift, type DurationType } from '@/utils/audioContext';
import FloatingNotes from './FloatingNotes';

interface Cloud {
  id: number;
  size: number;
  positionX: number;
  positionY: number;
  blur: number;
  opacity: number;
  speed: number;
  width: number; // Added width for more varied cloud shapes
  height: number; // Added height for more varied cloud shapes
}

const VirtualPiano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');
  const [lastNotePlayed, setLastNotePlayed] = useState<string | null>(null);

  // Generate improved random clouds once when component mounts
  const clouds = useMemo(() => {
    const cloudCount = Math.floor(Math.random() * 5) + 8; // 8-12 clouds
    return Array.from({ length: cloudCount }).map((_, i) => {
      const baseSize = Math.random() * 160 + 100; // 100-260px
      const widthFactor = Math.random() * 0.4 + 0.8; // 0.8-1.2x width variation
      const heightFactor = Math.random() * 0.3 + 0.5; // 0.5-0.8x height variation
      
      return {
        id: i,
        size: baseSize,
        width: baseSize * widthFactor,
        height: baseSize * heightFactor,
        positionX: Math.random() * 80 + 10, // 10-90%
        positionY: Math.random() * 80 + 10, // 10-90%
        blur: Math.random() * 20 + 15, // 15-35px blur
        opacity: Math.random() * 0.10 + 0.05, // 0.05-0.15 opacity (reduced)
        speed: Math.random() * 30 + 20, // 20-50s animation duration
      };
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a] z-0"></div>
      
      {/* Render improved clouds with varied shapes */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bg-white rounded-full cloud"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            left: `${cloud.positionX}%`,
            top: `${cloud.positionY}%`,
            opacity: cloud.opacity,
            filter: `blur(${cloud.blur}px)`,
            borderRadius: '50%',
            transform: `scale(${Math.random() * 0.4 + 0.8})`,
            // Fix: Use the correct syntax for CSS custom properties in React/TypeScript
            '--duration': `${cloud.speed}s`,
          } as React.CSSProperties}
        />
      ))}
      
      <FloatingNotes lastNotePlayed={lastNotePlayed} />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Virtual Piano</h1>
        <p className="text-center text-gray-400 mb-8">
          Play using your keyboard, click on the keys, or use the octave controls
        </p>
        
        <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden">
          <StatusBar octaveShift={octaveShift} durationType={durationType} />
          <Piano 
            octaveShift={octaveShift} 
            setOctaveShift={setOctaveShift} 
            durationType={durationType} 
            setDurationType={setDurationType}
            onNotePlayed={(note) => setLastNotePlayed(note)}
          />
        </div>
      </div>
      
      <KeyboardMapping />
    </div>
  );
};

export default VirtualPiano;
