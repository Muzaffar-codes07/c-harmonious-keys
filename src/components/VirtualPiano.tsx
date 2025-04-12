
import React, { useState } from 'react';
import Piano from './Piano';
import StatusBar from './StatusBar';
import KeyboardMapping from './KeyboardMapping';
import { type OctaveShift, type DurationType } from '@/utils/audioContext';

const VirtualPiano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-90 z-0"></div>
      
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Virtual Piano</h1>
        <p className="text-center text-gray-300 mb-8">
          Play using your keyboard or click on the keys
        </p>
        
        <div className="bg-background/30 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden">
          <StatusBar octaveShift={octaveShift} durationType={durationType} />
          <Piano />
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-4">
          Click the help icon for keyboard controls
        </p>
        
        <div className="text-center text-gray-400 text-sm mt-2">
          <p>First click activates the piano and begins loading samples.</p>
          <p>If samples aren't available, the piano will use synthesized sounds.</p>
        </div>
      </div>
      
      <KeyboardMapping />
    </div>
  );
};

export default VirtualPiano;
