
import React, { useState, useEffect, useCallback } from 'react';
import { 
  playNote, 
  type Note, 
  type OctaveShift, 
  type DurationType,
  getAudioContext
} from '@/utils/audioContext';
import { toast } from "@/components/ui/use-toast";

interface PianoKeyProps {
  note: Note;
  isBlack?: boolean;
  keyboardKey?: string;
  octaveShift: OctaveShift;
  durationType: DurationType;
  isPressed: boolean;
  onNotePlay: (note: Note) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ 
  note, 
  isBlack = false, 
  keyboardKey, 
  octaveShift,
  durationType,
  isPressed,
  onNotePlay
}) => {
  // Get the last character of the note as the display note
  const displayNote = note.replace(/s/, '#').slice(0, -1);
  
  const handleClick = () => {
    onNotePlay(note);
    playNote(note, octaveShift, durationType);
  };

  return (
    <div 
      className={`
        relative 
        ${isBlack 
          ? 'bg-[--black-key] text-white h-32 w-10 -mx-5 z-10' 
          : 'bg-[--white-key] text-black h-48 w-14'
        } 
        rounded-b-md 
        cursor-pointer 
        flex 
        flex-col 
        justify-end 
        items-center 
        pb-3
        transition-colors
        ${isPressed ? 'bg-[--key-press] animate-key-press' : ''}
        hover:bg-primary/50
      `}
      onClick={handleClick}
    >
      <div className="text-xs opacity-60">{displayNote}</div>
      {keyboardKey && (
        <div className="absolute bottom-12 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-background/80">
          {keyboardKey}
        </div>
      )}
    </div>
  );
};

const Piano: React.FC = () => {
  const [octaveShift, setOctaveShift] = useState<OctaveShift>(0);
  const [durationType, setDurationType] = useState<DurationType>('normal');
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
  const [initialized, setInitialized] = useState(false);

  // Define piano keys structure - each inner array is one octave
  const pianoStructure = [
    { note: 'C4' as Note, isBlack: false, keyboardKey: 'A' },
    { note: 'Cs4' as Note, isBlack: true, keyboardKey: 'W' },
    { note: 'D4' as Note, isBlack: false, keyboardKey: 'S' },
    { note: 'Ds4' as Note, isBlack: true, keyboardKey: 'E' },
    { note: 'E4' as Note, isBlack: false, keyboardKey: 'D' },
    { note: 'F4' as Note, isBlack: false, keyboardKey: 'F' },
    { note: 'Fs4' as Note, isBlack: true, keyboardKey: 'T' },
    { note: 'G4' as Note, isBlack: false, keyboardKey: 'G' },
    { note: 'Gs4' as Note, isBlack: true, keyboardKey: 'Y' },
    { note: 'A4' as Note, isBlack: false, keyboardKey: 'H' },
    { note: 'As4' as Note, isBlack: true, keyboardKey: 'U' },
    { note: 'B4' as Note, isBlack: false, keyboardKey: 'J' },
  ];

  // Initialize audio context on first user interaction
  const initializeAudio = useCallback(() => {
    if (!initialized) {
      getAudioContext();
      setInitialized(true);
    }
  }, [initialized]);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent repeat events when key is held down
    if (e.repeat) return;
    
    initializeAudio();

    // Map keys to notes
    const key = e.key.toLowerCase();
    
    // Mode controls
    if (key === '1') {
      setDurationType('short');
      toast({ description: "Short notes mode" });
      return;
    } else if (key === '2') {
      setDurationType('normal');
      toast({ description: "Normal notes mode" });
      return;
    } else if (key === '3') {
      setDurationType('long');
      toast({ description: "Long notes mode" });
      return;
    } else if (key === '[') {
      if (octaveShift > -1) {
        setOctaveShift((prev) => prev === 0 ? -1 : 0);
        toast({ description: "Octave shifted down" });
      }
      return;
    } else if (key === ']') {
      if (octaveShift < 1) {
        setOctaveShift((prev) => prev === 0 ? 1 : 0);
        toast({ description: "Octave shifted up" });
      }
      return;
    } else if (key === 'escape') {
      // Reset settings
      setOctaveShift(0);
      setDurationType('normal');
      toast({ description: "Settings reset" });
      return;
    }

    // Find the note for this key
    const keyInfo = pianoStructure.find(k => k.keyboardKey?.toLowerCase() === key);
    
    if (keyInfo) {
      setPressedKeys(prev => ({ ...prev, [key]: true }));
      playNote(keyInfo.note, octaveShift, durationType);
    }
  }, [octaveShift, durationType, pianoStructure, initialized]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setPressedKeys(prev => ({ ...prev, [key]: false }));
  }, []);

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleNotePlay = useCallback((note: Note) => {
    initializeAudio();
  }, [initializeAudio]);

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
    </div>
  );
};

export default Piano;
