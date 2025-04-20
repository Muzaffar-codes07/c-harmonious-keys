
import { type Note } from '@/utils/audioContext';

// Define the piano structure for a 7-white-key piano with properly placed black keys
export const pianoStructure = [
  { note: `C3` as Note, isBlack: false, keyboardKey: 'a' },  // 1st white key
  { note: `Cs3` as Note, isBlack: true, keyboardKey: 'w' },  // 1st black key
  { note: `D3` as Note, isBlack: false, keyboardKey: 's' },  // 2nd white key
  { note: `Ds3` as Note, isBlack: true, keyboardKey: 'e' },  // 2nd black key
  { note: `E3` as Note, isBlack: false, keyboardKey: 'd' },  // 3rd white key
  { note: `F3` as Note, isBlack: false, keyboardKey: 'f' },  // 4th white key
  { note: `Fs3` as Note, isBlack: true, keyboardKey: 't' },  // 3rd black key
  { note: `G3` as Note, isBlack: false, keyboardKey: 'g' },  // 5th white key
  { note: `Gs3` as Note, isBlack: true, keyboardKey: 'y' },  // 4th black key
  { note: `A3` as Note, isBlack: false, keyboardKey: 'h' },  // 6th white key
  { note: `As3` as Note, isBlack: true, keyboardKey: 'u' },  // 5th black key
  { note: `B3` as Note, isBlack: false, keyboardKey: 'j' },  // 7th white key
];
