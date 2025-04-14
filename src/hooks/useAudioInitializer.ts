
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { getAudioContext, isAudioReady } from '@/utils/audioContext';

export const useAudioInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const [samplesLoaded, setSamplesLoaded] = useState(false);

  // Initialize audio context on first user interaction
  const initializeAudio = useCallback(() => {
    if (!initialized) {
      getAudioContext();
      setInitialized(true);
      toast({ description: "Loading piano samples..." });
    }
  }, [initialized]);

  // Check audio loading status
  useEffect(() => {
    const checkAudioStatus = () => {
      const ready = isAudioReady();
      setSamplesLoaded(ready);
      
      if (!ready) {
        // If not ready, check again in a second
        setTimeout(checkAudioStatus, 1000);
      } else {
        toast({ description: "Piano samples loaded!" });
      }
    };
    
    if (initialized) {
      checkAudioStatus();
    }
  }, [initialized]);

  return {
    initialized,
    samplesLoaded,
    initializeAudio
  };
};
