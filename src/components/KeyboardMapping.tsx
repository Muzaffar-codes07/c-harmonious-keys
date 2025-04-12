
import React from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const KeyboardMapping: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">
        <div className="space-y-4">
          <h3 className="font-bold">Keyboard Controls</h3>
          
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground mb-1">WHITE KEYS</h4>
            <div className="grid grid-cols-7 gap-1">
              <div className="text-center"><div className="bg-primary/20 rounded px-1">A</div><div>C</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">S</div><div>D</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">D</div><div>E</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">F</div><div>F</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">G</div><div>G</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">H</div><div>A</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">J</div><div>B</div></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground mb-1">BLACK KEYS</h4>
            <div className="grid grid-cols-5 gap-1">
              <div className="text-center"><div className="bg-primary/20 rounded px-1">W</div><div>C#</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">E</div><div>D#</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">T</div><div>F#</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">Y</div><div>G#</div></div>
              <div className="text-center"><div className="bg-primary/20 rounded px-1">U</div><div>A#</div></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-xs text-muted-foreground mb-1">OPTIONS</h4>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="bg-primary/20 rounded px-1">[</span> Octave Down</div>
              <div><span className="bg-primary/20 rounded px-1">]</span> Octave Up</div>
              <div><span className="bg-primary/20 rounded px-1">1</span> Short Notes</div>
              <div><span className="bg-primary/20 rounded px-1">2</span> Normal Notes</div>
              <div><span className="bg-primary/20 rounded px-1">3</span> Long Notes</div>
              <div><span className="bg-primary/20 rounded px-1">ESC</span> Reset</div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default KeyboardMapping;
