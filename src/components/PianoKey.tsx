
import React from 'react';
import { type Note, type OctaveShift, type DurationType, playNote } from '@/utils/audioContext';

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

export default PianoKey;
