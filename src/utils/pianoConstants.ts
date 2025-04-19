import { type Note } from '@/utils/audioContext';

const generateOctaveNotes = (octave: number) => [
  { note: `C${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'A' : undefined },
  { note: `Cs${octave}` as Note, isBlack: true, keyboardKey: octave === 4 ? 'W' : undefined },
  { note: `D${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'S' : undefined },
  { note: `Ds${octave}` as Note, isBlack: true, keyboardKey: octave === 4 ? 'E' : undefined },
  { note: `E${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'D' : undefined },
  { note: `F${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'F' : undefined },
  { note: `Fs${octave}` as Note, isBlack: true, keyboardKey: octave === 4 ? 'T' : undefined },
  { note: `G${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'G' : undefined },
  { note: `Gs${octave}` as Note, isBlack: true, keyboardKey: octave === 4 ? 'Y' : undefined },
  { note: `A${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'H' : undefined },
  { note: `As${octave}` as Note, isBlack: true, keyboardKey: octave === 4 ? 'U' : undefined },
  { note: `B${octave}` as Note, isBlack: false, keyboardKey: octave === 4 ? 'J' : undefined },
];

// We keep the piano structure the same, but we'll handle the octave shifting 
// in the Piano component and the audioContext utility
export const pianoStructure = [
  ...generateOctaveNotes(3),  // Default to octave 3 as the base
];
