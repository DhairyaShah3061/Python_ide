import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { Problem } from '../types';

const DEFAULT_PROBLEM: Problem = {
  id: '',
  title: '',
  description: '',
  initialCode: '',
  testCases: [{ input: '', expectedOutput: '' }]
};

export function AdminPage() {
  const [problem, setProblem] = useState<Problem>(DEFAULT_PROBLEM);

  const handleSave = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('currentProblem', JSON.stringify(problem));
    alert('Problem saved successfully!');
  };

  const addTestCase = () => {
    setProblem({
      ...problem,
      testCases: [...problem.testCases, { input: '', expectedOutput: '' }]
    });
  };

  return (
    <div className="min-h-screen bg-black text-[#33ff33] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl flex items-center gap-2">
            <Settings /> Admin Dashboard
          </h1>
          <button
            onClick={handleSave}
            className="retro-button px-4 py-2 flex items-center gap-2"
          >
            <Save size={20} /> Save Problem
          </button>
        </header>

        <div className="space-y-6">
          <div className="retro-box p-6">
            <h2 className="text-xl mb-4">Problem Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  value={problem.title}
                  onChange={(e) => setProblem({ ...problem, title: e.target.value })}
                  className="w-full bg-black border-2 border-[#33ff33] p-2"
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  value={problem.description}
                  onChange={(e) => setProblem({ ...problem, description: e.target.value })}
                  className="w-full bg-black border-2 border-[#33ff33] p-2 h-32"
                />
              </div>
              <div>
                <label className="block mb-2">Initial Code</label>
                <textarea
                  value={problem.initialCode}
                  onChange={(e) => setProblem({ ...problem, initialCode: e.target.value })}
                  className="w-full bg-black border-2 border-[#33ff33] p-2 h-32 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="retro-box p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Test Cases</h2>
              <button
                onClick={addTestCase}
                className="retro-button px-4 py-2"
              >
                Add Test Case
              </button>
            </div>
            
            {problem.testCases.map((testCase, index) => (
              <div key={index} className="mb-4 p-4 border-2 border-[#33ff33]">
                <h3 className="mb-2">Test Case {index + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Input</label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => {
                        const newTestCases = [...problem.testCases];
                        newTestCases[index].input = e.target.value;
                        setProblem({ ...problem, testCases: newTestCases });
                      }}
                      className="w-full bg-black border-2 border-[#33ff33] p-2 h-24"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Expected Output</label>
                    <textarea
                      value={testCase.expectedOutput}
                      onChange={(e) => {
                        const newTestCases = [...problem.testCases];
                        newTestCases[index].expectedOutput = e.target.value;
                        setProblem({ ...problem, testCases: newTestCases });
                      }}
                      className="w-full bg-black border-2 border-[#33ff33] p-2 h-24"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}