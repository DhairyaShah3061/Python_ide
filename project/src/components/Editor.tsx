import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';

interface EditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
}

export function Editor({ code, onChange }: EditorProps) {
  // Calculate the number of lines in the initial code
  const initialCodeLines = code.split('\n').length;

  return (
    <div className="flex-grow border-b-2 border-[#33ff33]">
      <MonacoEditor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          fontFamily: 'Press Start 2P',
          readOnly: false,
          lineDecorations: [
            {
              range: {
                startLineNumber: 1,
                endLineNumber: initialCodeLines,
                startColumn: 1,
                endColumn: 1
              },
              options: {
                isWholeLine: true,
                className: 'read-only-line'
              }
            }
          ],
          lineNumbersMinChars: 3,
          // Only allow modifications after the initial code
          beforeEdit: (e: any) => {
            const startLine = e.range.startLineNumber;
            if (startLine <= initialCodeLines) {
              return false; // Prevent edits in the initial code area
            }
            return true;
          }
        }}
      />
    </div>
  );
}