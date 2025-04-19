
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
      
      {/* Enhanced cloud effects */}
      <div className="absolute top-[10%] left-[10%] w-40 h-20 bg-gray-400/10 rounded-full blur-2xl cloud"></div>
      <div className="absolute top-[15%] right-[15%] w-32 h-16 bg-gray-400/10 rounded-full blur-2xl cloud"></div>
      <div className="absolute bottom-[25%] left-[20%] w-48 h-24 bg-gray-400/10 rounded-full blur-2xl cloud"></div>
      <div className="absolute bottom-[30%] right-[25%] w-56 h-28 bg-gray-400/10 rounded-full blur-2xl cloud"></div>
      
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
