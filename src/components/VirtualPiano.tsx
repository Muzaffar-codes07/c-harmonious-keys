import React, { useState, useMemo } from 'react';
import Piano from './Piano';
import StatusBar from './StatusBar';
import KeyboardMapping from './KeyboardMapping';
import { type OctaveShift, type DurationType } from '@/utils/audioContext';
import FloatingNotes from './FloatingNotes';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Cloud {
  id: number;
  size: number;
  positionX: number;
  positionY: number;
  blur: number;
  opacity: number;
  speed: number;
  width: number;
  height: number;
}

const VirtualPiano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');
  const [lastNotePlayed, setLastNotePlayed] = useState<string | null>(null);
  const navigate = useNavigate();

  const clouds = useMemo(() => {
    const cloudCount = Math.floor(Math.random() * 5) + 8;
    return Array.from({ length: cloudCount }).map((_, i) => {
      const baseSize = Math.random() * 160 + 100;
      const widthFactor = Math.random() * 0.4 + 0.8;
      const heightFactor = Math.random() * 0.3 + 0.5;
      
      return {
        id: i,
        size: baseSize,
        width: baseSize * widthFactor,
        height: baseSize * heightFactor,
        positionX: Math.random() * 80 + 10,
        positionY: Math.random() * 80 + 10,
        blur: Math.random() * 20 + 15,
        opacity: Math.random() * 0.10 + 0.05,
        speed: Math.random() * 30 + 20,
      };
    });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a] z-0"></div>
      
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
            '--duration': `${cloud.speed}s`,
          } as React.CSSProperties}
        />
      ))}
      
      <FloatingNotes lastNotePlayed={lastNotePlayed} />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-white">Virtual Piano</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/c-program')}
            className="text-white"
          >
            View C program <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
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
