
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

  const noteColors = [
    { class: 'text-red-500', hex: '#ef4444' },
    { class: 'text-slate-300', hex: '#cbd5e1' },
    { class: 'text-orange-400', hex: '#fb923c' }
  ];

  useEffect(() => {
    if (lastNotePlayed) {
      const noteCount = Math.floor(Math.random() * 2) + 2; // 2-3 notes per key press
      
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
          variant: Math.random() > 0.5 ? 'music' : 'note'
        };

        setNotes(prev => [...prev, newNote]);

        setTimeout(() => {
          setNotes(prev => prev.filter(note => note.id !== newNote.id));
        }, 3000);
      }
    }
  }, [lastNotePlayed]);

  // Add decorative cloud elements
  const cloudPositions = [
    { left: '10%', top: '15%' },
    { right: '15%', top: '10%' },
    { left: '20%', bottom: '20%' },
    { right: '25%', bottom: '30%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Decorative clouds */}
      {cloudPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-32 h-16 bg-gray-400/10 rounded-full blur-xl"
          style={pos}
        />
      ))}
      
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
