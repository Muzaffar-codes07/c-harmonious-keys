
import { type Note } from '@/utils/audioContext';

// Define the piano structure to match the reference image
export const pianoStructure = [
  { note: `C3` as Note, isBlack: false, keyboardKey: 'a' },
  { note: `Cs3` as Note, isBlack: true, keyboardKey: 'w' },
  { note: `D3` as Note, isBlack: false, keyboardKey: 's' },
  { note: `Ds3` as Note, isBlack: true, keyboardKey: 'e' },
  { note: `E3` as Note, isBlack: false, keyboardKey: 'd' },
  { note: `F3` as Note, isBlack: false, keyboardKey: 'f' },
  { note: `Fs3` as Note, isBlack: true, keyboardKey: 't' },
  { note: `G3` as Note, isBlack: false, keyboardKey: 'g' },
  { note: `Gs3` as Note, isBlack: true, keyboardKey: 'y' },
  { note: `A3` as Note, isBlack: false, keyboardKey: 'h' },
  { note: `As3` as Note, isBlack: true, keyboardKey: 'u' },
  { note: `B3` as Note, isBlack: false, keyboardKey: 'j' },
];
