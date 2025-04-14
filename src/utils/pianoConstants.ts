
import { type Note } from '@/utils/audioContext';

// Define piano keys structure - each inner array is one octave
export const pianoStructure = [
  { note: 'C4' as Note, isBlack: false, keyboardKey: 'A' },
  { note: 'Cs4' as Note, isBlack: true, keyboardKey: 'W' },
  { note: 'D4' as Note, isBlack: false, keyboardKey: 'S' },
  { note: 'Ds4' as Note, isBlack: true, keyboardKey: 'E' },
  { note: 'E4' as Note, isBlack: false, keyboardKey: 'D' },
  { note: 'F4' as Note, isBlack: false, keyboardKey: 'F' },
  { note: 'Fs4' as Note, isBlack: true, keyboardKey: 'T' },
  { note: 'G4' as Note, isBlack: false, keyboardKey: 'G' },
  { note: 'Gs4' as Note, isBlack: true, keyboardKey: 'Y' },
  { note: 'A4' as Note, isBlack: false, keyboardKey: 'H' },
  { note: 'As4' as Note, isBlack: true, keyboardKey: 'U' },
  { note: 'B4' as Note, isBlack: false, keyboardKey: 'J' },
];
