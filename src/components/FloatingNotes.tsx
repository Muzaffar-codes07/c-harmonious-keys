
import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

interface Note {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
}

interface FloatingNotesProps {
  lastNotePlayed: string | null;
}

const FloatingNotes: React.FC<FloatingNotesProps> = ({ lastNotePlayed }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Colors for better visibility
  const noteColors = [
    'text-purple-400',
    'text-blue-400',
    'text-cyan-400',
    'text-white',
    'text-pink-400'
  ];

  useEffect(() => {
    if (lastNotePlayed) {
      const newNote: Note = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10-90% of width
        y: 100, // Start from bottom
        rotation: Math.random() * 360,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
        size: Math.random() * 12 + 8, // Random size between 8-20
      };

      setNotes(prev => [...prev, newNote]);

      // Remove note after animation
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
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
          }}
        >
          <Music style={{ width: `${note.size}px`, height: `${note.size}px` }} />
        </div>
      ))}
    </div>
  );
};

export default FloatingNotes;
