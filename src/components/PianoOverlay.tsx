
import React from 'react';

interface PianoOverlayProps {
  initialized: boolean;
  samplesLoaded: boolean;
  onInitialize: () => void;
}

const PianoOverlay: React.FC<PianoOverlayProps> = ({ 
  initialized, 
  samplesLoaded, 
  onInitialize 
}) => {
  if (!initialized) {
    return (
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        onClick={onInitialize}
      >
        <p className="text-white text-xl">Click to activate piano</p>
      </div>
    );
  }
  
  if (!samplesLoaded) {
    return (
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <div className="inline-block bg-background/80 text-primary px-3 py-1 rounded-full text-sm">
         
        </div>
      </div>
    );
  }
  
  return null;
};

export default PianoOverlay;
