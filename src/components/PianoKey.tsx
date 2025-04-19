
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
          ? 'bg-[--black-key] text-white/60 h-32 w-10 -mx-5 z-10' 
          : 'bg-[--white-key] text-black/60 h-48 w-14'
        } 
        rounded-b-md 
        cursor-pointer 
        flex 
        flex-col 
        justify-end 
        items-center 
        pb-3
        transition-all
        ${isPressed ? 'bg-[--key-press] animate-key-press' : ''}
        hover:bg-primary/30
      `}
      onClick={handleClick}
    >
      {keyboardKey && (
        <div className="absolute bottom-12 text-[10px] font-medium opacity-40">
          {keyboardKey}
        </div>
      )}
      <div className="text-xs opacity-40 mt-1">{displayNote}</div>
    </div>
  );
};

export default PianoKey;
