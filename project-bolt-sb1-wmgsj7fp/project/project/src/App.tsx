import React, { useState } from 'react';
import Split from 'react-split';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Play, Terminal, Code2, FileText, TestTube } from 'lucide-react';

const INITIAL_CODE = `# Write your Python code here
def hello():
    print('Hello, World!')

hello()`;

function Editor({ code, onChange }: { code: string; onChange: (value: string | undefined) => void }) {
  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0">
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
            fontFamily: '"Press Start 2P", monospace',
            lineHeight: 24,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}

function ProblemStatement() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 retro-header">
        <FileText className="w-4 h-4" />
        <h2 className="text-sm">Problem Description</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 retro-box">
        <h1 className="text-xl font-bold mb-6">Print Hello World</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-md font-semibold mb-2">Description</h2>
            <p className="text-sm leading-relaxed">Write a function that prints "Hello, World!" to the console.</p>
          </section>
          
          <section>
            <h2 className="text-md font-semibold mb-2">Example</h2>
            <div className="retro-terminal p-3 text-sm">
              <div className="mb-2">
                <span className="text-green-300">Input:</span> None
              </div>
              <div>
                <span className="text-green-300">Output:</span> Hello, World!
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-md font-semibold mb-2">Test Cases</h2>
            <div className="space-y-2">
              <div className="retro-terminal p-3 text-sm">
                <div className="text-green-300 mb-1">Test Case 1:</div>
                <div className="pl-2">Expected output: Hello, World!</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Console({ output }: { output: string }) {
  return (
    <div className="h-64 flex flex-col retro-terminal">
      <div className="flex items-center gap-2 px-2 py-2 border-b-2 border-[#33ff33]">
        <Terminal className="w-4 h-4" />
        <h3 className="text-sm">Console Output</h3>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {output || 'No output yet...'}
        </pre>
      </div>
    </div>
  );
}

function App() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    setOutput("Hello, World!\n(This is a simulated output)");
  };

  return (
    <div className="h-screen flex flex-col retro-background text-green-400">
      <header className="retro-header">
        <div className="h-12 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5" />
            <h1 className="text-lg">Retro IDE</h1>
          </div>
          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 px-4 py-1.5 retro-button text-sm"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
        </div>
      </header>

      <Split 
        className="flex-1"
        sizes={[40, 60]} 
        minSize={300} 
        gutterSize={8}
        gutter={() => {
          const gutter = document.createElement('div');
          gutter.className = 'bg-[#33ff33] hover:bg-[#22dd22] transition-colors';
          return gutter;
        }}
      >
        <ProblemStatement />
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 retro-header">
            <TestTube className="w-4 h-4" />
            <h2 className="text-sm">Code Editor</h2>
          </div>
          <div className="flex-1 flex flex-col retro-box">
            <Editor code={code} onChange={(value) => setCode(value || '')} />
            <Console output={output} />
          </div>
        </div>
      </Split>
    </div>
  );
}

export default App;