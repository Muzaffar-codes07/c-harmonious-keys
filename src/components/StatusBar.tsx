
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { type OctaveShift, type DurationType } from '@/utils/audioContext';

interface StatusBarProps {
  octaveShift: OctaveShift;
  durationType: DurationType;
}

const StatusBar: React.FC<StatusBarProps> = ({ octaveShift, durationType }) => {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
        Octave: {octaveShift === 0 ? "Normal" : octaveShift === 1 ? "Up" : "Down"}
      </Badge>
      
      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
        Duration: {durationType.charAt(0).toUpperCase() + durationType.slice(1)}
      </Badge>
    </div>
  );
};

export default StatusBar;
