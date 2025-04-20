
import React, { useCallback } from 'react';
import { type Note, type OctaveShift, type DurationType } from '@/utils/audioContext';
import PianoKey from './PianoKey';
import PianoOverlay from './PianoOverlay';
import { usePianoKeyboard } from '@/hooks/usePianoKeyboard';
import { useAudioInitializer } from '@/hooks/useAudioInitializer';
import { pianoStructure } from '@/utils/pianoConstants';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

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

  // Handle octave shifting with explicit buttons
  const handleOctaveShift = (direction: -1 | 1) => {
    // Calculate current and new octave
    const currentOctave = 3 + Number(octaveShift);
    const newOctave = currentOctave + direction;
    
    // Check for octave limits (1-5)
    if (newOctave < 1 || newOctave > 5) {
      toast({ description: `Octave limit reached (${newOctave})` });
      return;
    }
    
    // Convert back to octave shift value (-1, 0, 1)
    const newOctaveShift = (newOctave - 3) as OctaveShift;
    setOctaveShift(newOctaveShift);
    toast({ description: `Octave shifted to ${newOctave}` });
  };

  return (
    <div 
      className="flex flex-col justify-center items-center p-4 relative" 
      onClick={initializeAudio}
    >
      {/* Octave controls */}
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => handleOctaveShift(-1)}
          className="flex items-center justify-center p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Octave Down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
        <span className="text-white bg-black/30 px-4 py-1 rounded-full">
          Octave {3 + Number(octaveShift)}
        </span>
        <button 
          onClick={() => handleOctaveShift(1)}
          className="flex items-center justify-center p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Octave Up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="flex relative rounded-xl bg-[#121212] p-2 space-x-0.5 border-8 border-[#121212]">
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
