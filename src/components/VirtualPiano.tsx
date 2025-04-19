
import React, { useState } from 'react';
import Piano from './Piano';
import StatusBar from './StatusBar';
import KeyboardMapping from './KeyboardMapping';
import { type OctaveShift, type DurationType } from '@/utils/audioContext';
import FloatingNotes from './FloatingNotes';

const VirtualPiano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');
  const [lastNotePlayed, setLastNotePlayed] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#222] z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-[10%] left-[10%] w-32 h-16 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute top-10 right-[15%] w-24 h-12 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[30%] right-[25%] w-48 h-32 bg-white/5 rounded-full blur-3xl"></div>
      
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
