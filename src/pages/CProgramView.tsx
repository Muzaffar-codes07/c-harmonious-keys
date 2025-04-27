
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CProgramView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">C Program Implementation</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Piano
          </Button>
        </div>
        
        <pre className="bg-black/30 p-6 rounded-lg overflow-x-auto">
          <code className="text-sm">{`#include <stdio.h>
#include <windows.h>
#include <conio.h> // for _getch()
#include <stdbool.h>
#include <mmsystem.h>
#pragma comment(lib, "winmm.lib")

// Define octave levels
#define OCTAVE_MIN 1
#define OCTAVE_MAX 5

// Define duration types
typedef enum {
    DURATION_SHORT = 150,
    DURATION_NORMAL = 350,
    DURATION_LONG = 600
} DurationType;

// Structure to hold piano state
typedef struct {
    int octave;  // Now range from 1 to 5
    DurationType duration;
    bool isRunning;
} PianoState;

// Note index enum for better readability
typedef enum {
    NOTE_C, NOTE_CS, NOTE_D, NOTE_DS, NOTE_E, NOTE_F, 
    NOTE_FS, NOTE_G, NOTE_GS, NOTE_A, NOTE_AS, NOTE_B
} NoteIndex;

const char *noteNames[] = {
    "C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"
};

// Function to get filename based on note and octave
void get_note_filename(NoteIndex note, int octave, char *filename) {
    sprintf(filename, "piano_samples/%s%d.wav", noteNames[note], octave);
}

// Play a note with the given duration and cut off early if needed
void play_note(const char *filename, int duration) {
    PlaySound(filename, NULL, SND_FILENAME | SND_ASYNC);
    Sleep(duration);
    PlaySound(NULL, 0, 0); // Stop the sound early if needed
}

// Set duration and provide feedback
void set_duration(PianoState *state, DurationType duration, const char *modeName) {
    state->duration = duration;
    printf("[%s notes mode]\\n", modeName);
}

// Shift octave and provide feedback
void shift_octave(PianoState *state, int direction) {
    int newOctave = state->octave + direction;

    if (newOctave >= OCTAVE_MIN && newOctave <= OCTAVE_MAX) {
        state->octave = newOctave;
        printf("[Octave shifted %s to %d]\\n", direction > 0 ? "up" : "down", state->octave);
    } else {
        printf("[Octave limit reached]\\n");
    }
}

// Display help information
void display_help() {
    printf("Virtual Piano Controls:\\n");
    printf("---------------------\\n");
    printf("Play notes:      a s d f g h j     (white keys)\\n");
    printf("                 w e t y u         (black keys)\\n");
    printf("Duration:        1 - short notes\\n");
    printf("                 2 - normal notes\\n");
    printf("                 3 - long notes\\n");
    printf("Octave shift:    [ - shift down\\n");
    printf("                 ] - shift up\\n");
    printf("Help:            ? - show this help\\n");
    printf("Exit:            ESC\\n");
}

int main() {
    PianoState state = {
        .octave = 4,
        .duration = DURATION_NORMAL,
        .isRunning = true
    };

    printf("Virtual Piano (.wav mode with durations, octave 1-5)\\n");
    printf("Press '?' for help. ESC to exit.\\n");

    while (state.isRunning) {
        int key = _getch();

        switch (key) {
            case '1': set_duration(&state, DURATION_SHORT, "Short"); continue;
            case '2': set_duration(&state, DURATION_NORMAL, "Normal"); continue;
            case '3': set_duration(&state, DURATION_LONG, "Long"); continue;
            case '[': shift_octave(&state, -1); continue;
            case ']': shift_octave(&state, 1); continue;
            case '?': display_help(); continue;
            case 27:  state.isRunning = false; continue;
        }

        NoteIndex note;
        bool validNote = true;

        switch (key) {
            case 'a': note = NOTE_C; break;
            case 's': note = NOTE_D; break;
            case 'd': note = NOTE_E; break;
            case 'f': note = NOTE_F; break;
            case 'g': note = NOTE_G; break;
            case 'h': note = NOTE_A; break;
            case 'j': note = NOTE_B; break;

            case 'w': note = NOTE_CS; break;
            case 'e': note = NOTE_DS; break;
            case 't': note = NOTE_FS; break;
            case 'y': note = NOTE_GS; break;
            case 'u': note = NOTE_AS; break;

            default:
                validNote = false;
        }

        if (validNote) {
            char filename[64];
            get_note_filename(note, state.octave, filename);
            play_note(filename, state.duration);
        }
    }

    printf("Goodbye!\\n");
    return 0;
}`}</code>
        </pre>
      </div>
    </div>
  );
};

export default CProgramView;
