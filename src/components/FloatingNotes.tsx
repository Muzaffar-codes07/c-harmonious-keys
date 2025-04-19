
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
    { class: 'text-red-500', hex: '#ef4444' },
    { class: 'text-slate-300', hex: '#cbd5e1' },
    { class: 'text-orange-400', hex: '#fb923c' }
  ];

  useEffect(() => {
    if (lastNotePlayed) {
      // Create more notes per key press to match the reference image
      for (let i = 0; i < 3; i++) {
        const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
        const newNote: Note = {
          id: Date.now() + i,
          x: Math.random() * 80 + 10, // Distribute across the screen
          y: Math.random() * 10,    // Start at slightly different heights
          rotation: Math.random() * 360,
          color: randomColor.class,
          colorHex: randomColor.hex,
          size: Math.random() * 20 + 28, // Larger size range
          variant: Math.random() > 0.5 ? 'music' : 'note'
        };

        setNotes(prev => [...prev, newNote]);

        // Remove notes after animation completes
        setTimeout(() => {
          setNotes(prev => prev.filter(note => note.id !== newNote.id));
        }, 3000);
      }
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
            animation: 'float-up 3s ease-out forwards',
            filter: `drop-shadow(0 0 12px ${note.colorHex})`,
            opacity: 0.8
          }}
        >
          <Music 
            style={{ 
              width: `${note.size}px`, 
              height: `${note.size}px`,
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingNotes;
