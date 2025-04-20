
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
}

const VirtualPiano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');
  const [lastNotePlayed, setLastNotePlayed] = useState<string | null>(null);

  // Generate random clouds once when component mounts
  const clouds = useMemo(() => {
    const cloudCount = Math.floor(Math.random() * 5) + 8; // 8-12 clouds
    return Array.from({ length: cloudCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 160 + 100, // 100-260px
      positionX: Math.random() * 80 + 10, // 10-90%
      positionY: Math.random() * 80 + 10, // 10-90%
      blur: Math.random() * 20 + 15, // 15-35px blur
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacity
      speed: Math.random() * 20 + 20, // 20-40s animation duration
    }));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a] z-0"></div>
      
      {/* Render clouds with random properties */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bg-white rounded-full cloud"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            left: `${cloud.positionX}%`,
            top: `${cloud.positionY}%`,
            opacity: cloud.opacity,
            filter: `blur(${cloud.blur}px)`,
            animation: `cloud-drift ${cloud.speed}s linear infinite`,
          }}
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
