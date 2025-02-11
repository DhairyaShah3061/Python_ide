import React, { useState } from 'react';
import Split from 'react-split';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Play, Send, Trophy, MessageSquare, Terminal } from 'lucide-react';

type Language = 'javascript' | 'python' | 'cpp' | 'java';

interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

interface CodeExecutionResult {
  status: 'success' | 'error';
  output: string;
  executionTime?: number;
  memoryUsage?: number;
  testCasesPassed?: number;
  totalTestCases?: number;
}

const INITIAL_CODE = `function twoSum(nums, target) {
  // Write your solution here
}`;

const PUBLIC_TESTS: TestCase[] = [
  {
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
  },
  {
    input: 'nums = [3,2,4], target = 6',
    output: '[1,2]',
  },
];

const PRIVATE_TESTS: TestCase[] = [
  { input: 'hidden', output: 'hidden', isHidden: true },
  { input: 'hidden', output: 'hidden', isHidden: true },
];

function Editor({ language, code, onChange }: { language: Language; code: string; onChange: (value: string | undefined) => void }) {
  const getLanguageId = (lang: Language) => {
    switch (lang) {
      case 'cpp': return 'cpp';
      case 'python': return 'python';
      case 'java': return 'java';
      default: return 'javascript';
    }
  };

  return (
    <MonacoEditor
      height="100%"
      language={getLanguageId(language)}
      theme="vs-dark"
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

function ProblemStatement() {
  return (
    <div className="p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Two Sum</h1>
      <div className="prose prose-sm max-w-none">
        <p className="mb-4">
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>
        
        <h2 className="text-lg font-semibold mt-6 mb-2">Constraints:</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>2 ≤ nums.length ≤ 10⁴</li>
          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>