
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
  position?: number; // Add position prop to position black keys
}

const PianoKey: React.FC<PianoKeyProps> = ({ 
  note, 
  isBlack = false, 
  keyboardKey, 
  octaveShift,
  durationType,
  isPressed,
  onNotePlay,
  position
}) => {
  const displayNote = note.replace(/s/, '#').slice(0, -1);
  
  const handleClick = () => {
    onNotePlay(note);
    playNote(note, octaveShift, durationType);
  };

  if (isBlack) {
    return (
      <div 
        className={`
          absolute 
          top-0
          w-5 h-24
          bg-[#121212]
          rounded-r-md
          z-20
          cursor-pointer
          transition-all
          ${isPressed ? 'bg-[--key-press] animate-key-press' : ''}
          hover:bg-primary/30
        `}
        style={{ left: position ? `${position}px` : 'auto' }}
        onClick={handleClick}
      >
        {keyboardKey && (
          <div className="absolute bottom-2 w-full text-center text-[10px] font-medium text-white/40">
            {keyboardKey.toLowerCase()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`
        relative 
        bg-[#c7c9c4]
        w-12 h-40
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
        border-[#121212]/20
      `}
      onClick={handleClick}
    >
      {keyboardKey && (
        <div className="text-[10px] font-medium text-black/40 mb-1">
          {keyboardKey.toLowerCase()}
        </div>
      )}
      <div className="text-xs text-black/30">{displayNote}</div>
    </div>
  );
};

export default PianoKey;
