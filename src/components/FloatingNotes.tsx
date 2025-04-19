
import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

interface Note {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

interface FloatingNotesProps {
  lastNotePlayed: string | null;
}

const FloatingNotes: React.FC<FloatingNotesProps> = ({ lastNotePlayed }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (lastNotePlayed) {
      const newNote: Note = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10-90% of width
        y: 100, // Start from bottom
        rotation: Math.random() * 360,
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
          className="absolute text-white/30"
          style={{
            left: `${note.x}%`,
            bottom: `${note.y}%`,
            transform: `rotate(${note.rotation}deg)`,
            animation: 'float-up 2s ease-out forwards'
          }}
        >
          <Music className="w-8 h-8" />
        </div>
      ))}
    </div>
  );
};

export default FloatingNotes;
