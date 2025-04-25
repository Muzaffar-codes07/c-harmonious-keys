
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
  position?: number;
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
          w-8 h-32
          bg-[#121212]
          rounded-b-lg
          z-20
          cursor-pointer
          transition-all
          duration-100
          -translate-x-1/2
          shadow-lg
          ${isPressed ? 'bg-[--key-press] translate-y-1 scale-98' : 'hover:bg-primary/30'}
        `}
        style={{ left: position ? `${position}px` : 'auto' }}
        onClick={handleClick}
      >
        {keyboardKey && (
          <div className="absolute bottom-3 w-full text-center text-[10px] font-medium text-white/60">
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
        bg-[#f1f1f0]
        w-14 h-52
        rounded-b-xl
        cursor-pointer 
        flex 
        flex-col 
        justify-end 
        items-center 
        pb-3
        transition-all
        duration-100
        border-x border-b border-[#121212]/10
        shadow-md
        ${isPressed ? 'bg-[--key-press] translate-y-1 scale-98' : 'hover:bg-primary/10'}
      `}
      onClick={handleClick}
    >
      {keyboardKey && (
        <div className="text-xs font-medium text-black/50 mb-1">
          {keyboardKey.toLowerCase()}
        </div>
      )}
      <div className="text-sm font-semibold text-black/40">{displayNote}</div>
    </div>
  );
};

export default PianoKey;
