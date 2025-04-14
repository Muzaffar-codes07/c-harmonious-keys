
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { type OctaveShift, type DurationType } from '@/utils/audioContext';

interface StatusBarProps {
  octaveShift: OctaveShift;
  durationType: DurationType;
}

const StatusBar: React.FC<StatusBarProps> = ({ octaveShift, durationType }) => {
  // Mapping to humanize the octave shift display
  const octaveDisplay = {
    '-1': 'Down',
    '0': 'Normal',
    '1': 'Up'
  }[octaveShift.toString()];

  // Capitalize the first letter of the duration type
  const durationDisplay = durationType.charAt(0).toUpperCase() + durationType.slice(1);

  return (
    <div className="flex items-center justify-between p-3 bg-background/40">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          Octave: {octaveDisplay}
        </Badge>
        
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          Duration: {durationDisplay}
        </Badge>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Press ? for help
      </div>
    </div>
  );
};

export default StatusBar;
