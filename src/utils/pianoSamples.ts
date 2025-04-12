
// Define the base URL for piano samples
// This assumes you'll add piano samples to the public/piano-samples folder
const SAMPLES_BASE_URL = '/piano-samples/';

// Cache for loaded audio buffers
const sampleCache: Record<string, AudioBuffer> = {};

// Notes we need to load samples for
const noteNames = [
  'C3', 'Cs3', 'D3', 'Ds3', 'E3', 'F3', 'Fs3', 'G3', 'Gs3', 'A3', 'As3', 'B3',
  'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4', 'Gs4', 'A4', 'As4', 'B4',
  'C5', 'Cs5', 'D5', 'Ds5', 'E5', 'F5', 'Fs5', 'G5', 'Gs5', 'A5', 'As5', 'B5',
];

// Convert internal note name format to filename format
const getNoteFilename = (note: string): string => {
  // Replace 's' with 'sharp' for filenames
  return note.replace('s', 'sharp') + '.wav';
};

// Load a single sample
const loadSample = async (
  audioContext: AudioContext,
  note: string
): Promise<AudioBuffer> => {
  const filename = getNoteFilename(note);
  const url = SAMPLES_BASE_URL + filename;
  
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } catch (error) {
    console.error(`Error loading piano sample ${url}:`, error);
    throw error;
  }
};

// Load all piano samples
export const loadPianoSamples = async (audioContext: AudioContext): Promise<boolean> => {
  try {
    const loadPromises = noteNames.map(async (note) => {
      if (!sampleCache[note]) {
        sampleCache[note] = await loadSample(audioContext, note);
      }
    });
    
    await Promise.all(loadPromises);
    console.log('All piano samples loaded successfully');
    return true;
  } catch (error) {
    console.error('Failed to load piano samples:', error);
    return false;
  }
};

// Get a sample from cache
export const getPianoSample = (note: string): AudioBuffer | undefined => {
  return sampleCache[note];
};

// Check if all samples are loaded
export const areSamplesLoaded = (): boolean => {
  return noteNames.every(note => !!sampleCache[note]);
};

// Check if a specific sample is loaded
export const isSampleLoaded = (note: string): boolean => {
  return !!sampleCache[note];
};
