
import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

interface Note {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  variant: 'music' | 'note';
  colorHex: string;
}

interface FloatingNotesProps {
  lastNotePlayed: string | null;
}

const FloatingNotes: React.FC<FloatingNotesProps> = ({ lastNotePlayed }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Enhanced color palette matching the image
  const noteColors = [
    { class: 'text-red-400', hex: '#f87171' },
    { class: 'text-slate-300', hex: '#cbd5e1' },
    { class: 'text-orange-300', hex: '#fdba74' }
  ];

  useEffect(() => {
    if (lastNotePlayed) {
      const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      const newNote: Note = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: 0,
        rotation: Math.random() * 360,
        color: randomColor.class,
        colorHex: randomColor.hex,
        size: Math.random() * 16 + 24, // Larger size range
        variant: Math.random() > 0.5 ? 'music' : 'note'
      };

      setNotes(prev => [...prev, newNote]);

      setTimeout(() => {
        setNotes(prev => prev.filter(note => note.id !== newNote.id));
      }, 2000);
    }
  }, [lastNotePlayed]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute ${note.color}`}
          style={{
            left: `${note.x}%`,
            bottom: `${note.y}%`,
            transform: `rotate(${note.rotation}deg)`,
            animation: 'float-up 2s ease-out forwards',
            filter: `drop-shadow(0 0 12px ${note.colorHex})`
          }}
        >
          <Music 
            style={{ 
              width: `${note.size}px`, 
              height: `${note.size}px`,
              opacity: 0.9
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingNotes;
