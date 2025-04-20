
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
      {/* Randomly generated decorative clouds */}
      {Array.from({ length: 8 }).map((_, i) => {
        // Generate random cloud properties
        const size = Math.random() * 120 + 80; // 80-200px
        const positionX = Math.random() * 80 + 10; // 10-90%
        const positionY = Math.random() * 80 + 10; // 10-90%
        const speed = Math.random() * 30 + 10; // 10-40s animation duration
        const blur = Math.random() * 15 + 10; // 10-25px blur radius
        const opacity = Math.random() * 0.15 + 0.1; // 0.1-0.25 opacity
        const delay = Math.random() * -30; // Negative delay for staggered start
        
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size * 0.6}px`,
              left: `${positionX}%`,
              top: `${positionY}%`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              animation: `cloud-drift ${speed}s linear infinite`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
      
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
            opacity: note.opacity
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
