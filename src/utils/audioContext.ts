
// Create a singleton audio context
let audioContext: AudioContext | null = null;

export const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Define note frequencies (in Hz)
const NOTE_FREQUENCIES = {
  // Octave 3
  C3: 130.81, Cs3: 138.59, D3: 146.83, Ds3: 155.56, 
  E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, 
  Gs3: 207.65, A3: 220.00, As3: 233.08, B3: 246.94,

  // Octave 4
  C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, 
  E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, 
  Gs4: 415.30, A4: 440.00, As4: 466.16, B4: 493.88,

  // Octave 5
  C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, 
  E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, 
  Gs5: 830.61, A5: 880.00, As5: 932.33, B5: 987.77,
};

export type Note = keyof typeof NOTE_FREQUENCIES;
export type OctaveShift = -1 | 0 | 1;
export type DurationType = 'short' | 'normal' | 'long';

// Duration mapping in milliseconds
export const DURATIONS = {
  short: 150,
  normal: 350,
  long: 600,
};

// Play a piano note with the given frequency and duration
export const playNote = (
  note: Note,
  octaveShift: OctaveShift = 0,
  durationType: DurationType = 'normal'
): void => {
  const ctx = getAudioContext();
  
  // Get the actual note based on octave shift
  const actualNote = getShiftedNote(note, octaveShift);
  const frequency = NOTE_FREQUENCIES[actualNote];
  const duration = DURATIONS[durationType] / 1000; // Convert to seconds

  // Create oscillator for the piano sound
  const oscillator = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Create gain node for volume envelope
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  // Connect nodes and start playing
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);
};

// Get a shifted note based on the octave shift
const getShiftedNote = (note: Note, octaveShift: OctaveShift): Note => {
  // Extract the base note and current octave
  const baseNote = note.substring(0, note.length - 1) as 'C' | 'Cs' | 'D' | 'Ds' | 'E' | 'F' | 'Fs' | 'G' | 'Gs' | 'A' | 'As' | 'B';
  const currentOctave = parseInt(note.charAt(note.length - 1));
  
  // Calculate the new octave
  const newOctave = currentOctave + octaveShift;
  
  // Only allow octaves 3-5
  if (newOctave < 3 || newOctave > 5) {
    return note;
  }
  
  return `${baseNote}${newOctave}` as Note;
};
