
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { type Note, type OctaveShift, type DurationType, playNote } from '@/utils/audioContext';

interface UsePianoKeyboardProps {
  octaveShift: OctaveShift;
  setOctaveShift: React.Dispatch<React.SetStateAction<OctaveShift>>;
  durationType: DurationType;
  setDurationType: React.Dispatch<React.SetStateAction<DurationType>>;
  pianoStructure: Array<{ note: Note, isBlack?: boolean, keyboardKey?: string }>;
  initializeAudio: () => void;
}

export const usePianoKeyboard = ({
  octaveShift,
  setOctaveShift,
  durationType,
  setDurationType,
  pianoStructure,
  initializeAudio
}: UsePianoKeyboardProps) => {
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

  // Set duration and provide feedback
  const setDurationWithFeedback = useCallback((newDuration: DurationType, modeName: string) => {
    setDurationType(newDuration);
    toast({ description: `${modeName} notes mode` });
  }, [setDurationType]);

  // Shift octave and provide feedback
  const shiftOctaveWithFeedback = useCallback((direction: -1 | 0 | 1) => {
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
  }, [octaveShift, setOctaveShift]);

  // Reset settings
  const resetSettings = useCallback(() => {
    setOctaveShift(0);
    setDurationType('normal');
    toast({ description: "Settings reset" });
  }, [setOctaveShift, setDurationType]);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent repeat events when key is held down
    if (e.repeat) return;
    
    initializeAudio();

    // Map keys to notes
    const key = e.key.toLowerCase();
    
    // Mode controls
    if (key === '1') {
      setDurationWithFeedback('short', "Short");
      return;
    } else if (key === '2') {
      setDurationWithFeedback('normal', "Normal");
      return;
    } else if (key === '3') {
      setDurationWithFeedback('long', "Long");
      return;
    } else if (key === '[') {
      shiftOctaveWithFeedback(-1);
      return;
    } else if (key === ']') {
      shiftOctaveWithFeedback(1);
      return;
    } else if (key === 'escape') {
      resetSettings();
      return;
    } else if (key === '?') {
      // Display help as a toast
      toast({ 
        description: "Press [/] for octave shift, 1/2/3 for duration, ESC to reset",
        duration: 5000
      });
      return;
    }

    // Find the note for this key
    const keyInfo = pianoStructure.find(k => k.keyboardKey?.toLowerCase() === key);
    
    if (keyInfo) {
      setPressedKeys(prev => ({ ...prev, [key]: true }));
      playNote(keyInfo.note, octaveShift, durationType);
    }
  }, [
    octaveShift, 
    durationType, 
    pianoStructure, 
    initializeAudio,
    setDurationWithFeedback,
    shiftOctaveWithFeedback,
    resetSettings
  ]);

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

  return { pressedKeys };
};
