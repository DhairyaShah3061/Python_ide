import React, { useState } from 'react';
import Split from 'react-split';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Play, Terminal, FileText, Settings, Info } from 'lucide-react';

const INITIAL_CODE = `# Write your Python code here\ndef hello():\n    print('Hello, World!')\n\nhello()`;

function Editor({ code, onChange }) {
  return (
    <div style={{ flexGrow: 1, borderBottom: '2px solid #33ff33' }}>
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
    </div>
  );
}

function ProblemStatement() {
  return (
    <div style={{ background: '#111', borderRight: '2px solid #33ff33', padding: '16px', overflowY: 'auto' }}>
      <div style={{ borderBottom: '2px solid #33ff33', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileText />
        <h2>Problem Statement</h2>
      </div>
      <h1>Print Hello World</h1>
      <p>Write a function that prints "Hello, World!" to the console.</p>
      <h2>Example</h2>
      <div style={{ background: 'black', color: '#33ff33', border: '2px solid #33ff33', padding: '10px' }}>
        <p><strong>Input:</strong> None</p>
        <p><strong>Output:</strong> Hello, World!</p>
      </div>
    </div>
  );
}

function Console({ output }) {
  return (
    <div style={{ background: 'black', borderTop: '2px solid #33ff33', padding: '10px' }}>
      <div style={{ borderBottom: '2px solid #33ff33', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Terminal />
        <h3>Console Output</h3>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', padding: '10px' }}>{output || 'No output yet...'}</pre>
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'black', color: '#33ff33' }}>
      <header style={{ background: '#111', borderBottom: '2px solid #33ff33', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Python Retro IDE</h1>
        <div>
          <button style={{ background: 'transparent', border: 'none', color: '#33ff33', marginRight: '10px' }}>
            <Settings />
          </button>
          <button style={{ background: 'transparent', border: 'none', color: '#33ff33', marginRight: '10px' }}>
            <Info />
          </button>
          <button onClick={handleRunCode} style={{ background: '#33ff33', color: 'black', fontFamily: 'Press Start 2P', border: '2px solid #111', padding: '8px 12px', cursor: 'pointer' }}>
            <Play /> Run Code
          </button>
        </div>
      </header>
      <Split sizes={[50, 50]} minSize={300} gutterSize={8} style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
        <ProblemStatement />
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Editor code={code} onChange={(value) => setCode(value || '')} />
          <Console output={output} />
        </div>
      </Split>
    </div>
  );
}

export default App;
