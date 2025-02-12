import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Split from 'react-split';
import { Play, Terminal, FileText, Settings } from 'lucide-react';
import { Editor } from './components/Editor';
import { Console } from './components/Console';
import { AdminPage } from './pages/AdminPage';
import { Problem } from './types';
import { initializeSkulpt, runPython } from './utils/skulpt';

const DEFAULT_PROBLEM: Problem = {
  id: '1',
  title: 'Print Hello World',
  description: 'Write a function that prints "Hello, World!" to the console.',
  initialCode: '# Write your Python code here\ndef hello():\n    print("Hello, World!")\n\nhello()',
  testCases: [
    {
      input: '',
      expectedOutput: 'Hello, World!\n'
    }
  ]
};

function IDE() {
  const [problem, setProblem] = useState<Problem>(DEFAULT_PROBLEM);
  const [code, setCode] = useState(DEFAULT_PROBLEM.initialCode);
  const [output, setOutput] = useState('');

  useEffect(() => {
    initializeSkulpt();
    const savedProblem = localStorage.getItem('currentProblem');
    if (savedProblem) {
      const parsed = JSON.parse(savedProblem);
      setProblem(parsed);
      setCode(parsed.initialCode);
    }
  }, []);

  const handleRunCode = async () => {
    const result = await runPython(code);
    setOutput(result);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#33ff33]">
      <header className="bg-[#111] border-b-2 border-[#33ff33] p-4 flex justify-between items-center">
        <h1>Python Retro IDE</h1>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#33ff33]">
            <Settings />
          </Link>
          <button
            onClick={handleRunCode}
            className="retro-button px-4 py-2 flex items-center gap-2"
          >
            <Play size={20} /> Run Code
          </button>
        </div>
      </header>
      
      <Split sizes={[50, 50]} minSize={300} gutterSize={8} className="flex h-[calc(100vh-64px)]">
        <div className="bg-[#111] border-r-2 border-[#33ff33] p-4 overflow-y-auto">
          <div className="border-b-2 border-[#33ff33] pb-2 flex items-center gap-2 mb-4">
            <FileText />
            <h2>Problem Statement</h2>
          </div>
          <h1 className="text-xl mb-4">{problem.title}</h1>
          <p className="mb-4">{problem.description}</p>
          <h2 className="text-lg mb-2">Example</h2>
          <div className="bg-black text-[#33ff33] border-2 border-[#33ff33] p-4">
            <p><strong>Input:</strong> {problem.testCases[0].input || 'None'}</p>
            <p><strong>Output:</strong> {problem.testCases[0].expectedOutput}</p>
          </div>
        </div>
        
        <div className="flex flex-col w-full">
          <Editor code={code} onChange={(value) => setCode(value || '')} />
          <Console output={output} />
        </div>
      </Split>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IDE />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}