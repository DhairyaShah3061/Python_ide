import React, { useState } from 'react';
import Split from 'react-split';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Play, Terminal } from 'lucide-react';
import './retro-theme.css';

const INITIAL_CODE = `# Write your Python code here\ndef hello():\n    print('Hello, World!')\n\nhello()`;

function Editor({ code, onChange }) {
  return (
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
      }}
    />
  );
}

function ProblemStatement() {
  return (
    <div className="p-6 overflow-y-auto retro-box">
      <h1 className="text-2xl font-bold mb-4">Problem: Print Hello</h1>
      <p className="mb-4">Write a function that prints "Hello, World!"</p>
      <h2 className="text-lg font-semibold mt-4">Example:</h2>
      <pre className="retro-terminal">
        Input: None\nOutput: Hello, World!
      </pre>
    </div>
  );
}

function Console({ output }) {
  return (
    <div className="retro-terminal p-4 h-32 overflow-auto">
      <div className="flex items-center mb-2">
        <Terminal className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Console Output</h3>
      </div>
      <pre className="text-sm whitespace-pre-wrap">{output || 'No output yet'}</pre>
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
    <div className="h-screen retro-background text-green-400">
      <div className="h-12 retro-header flex items-center justify-between px-4 border-b border-green-500">
        <h2 className="text-lg font-semibold">Python Retro IDE</h2>
        <button
          onClick={handleRunCode}
          className="flex items-center px-4 py-1.5 retro-button"
        >
          <Play className="w-4 h-4 mr-2" /> Run Code
        </button>
      </div>
      <Split className="h-[calc(100vh-3rem)]" sizes={[40, 60]} minSize={300} gutterSize={8}>
        <ProblemStatement />
        <div className="h-full flex flex-col">
          <Editor code={code} onChange={(value) => setCode(value || '')} />
          <Console output={output} />
        </div>
      </Split>
    </div>
  );
}

export default App;
