import React, { useCallback } from 'react';
import { type Note, type OctaveShift, type DurationType } from '@/utils/audioContext';
import PianoKey from './PianoKey';
import PianoOverlay from './PianoOverlay';
import { usePianoKeyboard } from '@/hooks/usePianoKeyboard';
import { useAudioInitializer } from '@/hooks/useAudioInitializer';
import { pianoStructure } from '@/utils/pianoConstants';

interface PianoProps {
  octaveShift: OctaveShift;
  setOctaveShift: React.Dispatch<React.SetStateAction<OctaveShift>>;
  durationType: DurationType;
  setDurationType: React.Dispatch<React.SetStateAction<DurationType>>;
  onNotePlayed?: (note: string) => void;
}

const Piano: React.FC<PianoProps> = ({ 
  octaveShift, 
  setOctaveShift, 
  durationType, 
  setDurationType,
  onNotePlayed 
}) => {
  const { initialized, samplesLoaded, initializeAudio } = useAudioInitializer();
  
  const handleNotePlay = useCallback((note: Note) => {
    initializeAudio();
    onNotePlayed?.(note);
  }, [initializeAudio, onNotePlayed]);

  const { pressedKeys } = usePianoKeyboard({
    octaveShift,
    setOctaveShift,
    durationType,
    setDurationType,
    pianoStructure,
    initializeAudio
  });

  return (
    <div 
      className="flex justify-center items-end p-4 relative" 
      onClick={initializeAudio}
    >
      <div className="flex relative">
        {pianoStructure.map((key, index) => (
          <PianoKey
            key={key.note}
            note={key.note}
            isBlack={key.isBlack}
            keyboardKey={key.keyboardKey}
            octaveShift={octaveShift}
            durationType={durationType}
            isPressed={key.keyboardKey ? pressedKeys[key.keyboardKey.toLowerCase()] : false}
            onNotePlay={handleNotePlay}
          />
        ))}
      </div>
      
      <PianoOverlay 
        initialized={initialized}
        samplesLoaded={samplesLoaded}
        onInitialize={initializeAudio}
      />
    </div>
  );
};

export default Piano;
