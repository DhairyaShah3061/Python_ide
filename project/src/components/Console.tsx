import React from 'react';
import { Terminal } from 'lucide-react';

interface ConsoleProps {
  output: string;
}

export function Console({ output }: ConsoleProps) {
  return (
    <div className="bg-black border-t-2 border-[#33ff33] p-4">
      <div className="border-b-2 border-[#33ff33] pb-2 flex items-center gap-2">
        <Terminal />
        <h3>Console Output</h3>
      </div>
      <pre className="whitespace-pre-wrap p-4">{output || 'No output yet...'}</pre>
    </div>
  );
}