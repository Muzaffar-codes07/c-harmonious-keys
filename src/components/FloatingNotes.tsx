
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
  opacity: number;
}

interface FloatingNotesProps {
  lastNotePlayed: string | null;
}

const FloatingNotes: React.FC<FloatingNotesProps> = ({ lastNotePlayed }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const noteColors = [
    { class: 'text-red-500', hex: '#ef4444' },
    { class: 'text-blue-400', hex: '#60a5fa' },
    { class: 'text-orange-400', hex: '#fb923c' },
    { class: 'text-purple-400', hex: '#c084fc' },
    { class: 'text-emerald-400', hex: '#34d399' }
  ];

  useEffect(() => {
    if (lastNotePlayed) {
      const noteCount = Math.floor(Math.random() * 3) + 2; // 2-4 notes per key press
      
      for (let i = 0; i < noteCount; i++) {
        const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
        const newNote: Note = {
          id: Date.now() + i,
          x: Math.random() * 90 + 5, // More spread across screen (5-95%)
          y: Math.random() * 20, // Start at different heights
          rotation: Math.random() * 360,
          color: randomColor.class,
          colorHex: randomColor.hex,
          size: Math.random() * 16 + 24, // 24-40px size range
          variant: Math.random() > 0.5 ? 'music' : 'note',
          opacity: Math.random() * 0.3 + 0.7 // 0.7-1.0 opacity range
        };

        setNotes(prev => [...prev, newNote]);

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
            opacity: note.opacity,
            // Fix: Use the correct syntax for CSS custom properties in React/TypeScript
            '--rotation': `${note.rotation}deg`,
          } as React.CSSProperties}
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
