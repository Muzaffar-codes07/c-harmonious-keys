
// Define the base URL for piano samples
// This assumes you'll add piano samples to the public/piano-samples folder
const SAMPLES_BASE_URL = '/piano-samples/';

// Cache for loaded audio buffers
const sampleCache: Record<string, AudioBuffer> = {};

// Define octave range
const MIN_OCTAVE = 1;
const MAX_OCTAVE = 5;

// Generate the full list of notes we need to load samples for
const generateNoteNames = (): string[] => {
  const baseNotes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
  const allNotes: string[] = [];
  
  for (let octave = MIN_OCTAVE; octave <= MAX_OCTAVE; octave++) {
    for (const note of baseNotes) {
      allNotes.push(`${note}${octave}`);
    }
  }
  
  return allNotes;
};

// Notes we need to load samples for
const noteNames = generateNoteNames();

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
        try {
          sampleCache[note] = await loadSample(audioContext, note);
        } catch (error) {
          console.warn(`Failed to load sample for ${note}, will use synthesized fallback`);
        }
      }
    });
    
    await Promise.all(loadPromises);
    console.log('Piano samples loaded successfully');
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
  return noteNames.some(note => !!sampleCache[note]);
};

// Check if a specific sample is loaded
export const isSampleLoaded = (note: string): boolean => {
  return !!sampleCache[note];
};

// Get the min and max octaves
export const getOctaveRange = (): {min: number, max: number} => {
  return {min: MIN_OCTAVE, max: MAX_OCTAVE};
};
