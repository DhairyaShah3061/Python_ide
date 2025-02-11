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
          <li>-10⁹ ≤ target ≤ 10⁹</li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-2">Example:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md">
          Input: nums = [2,7,11,15], target = 9{'\n'}
          Output: [0,1]{'\n'}
          Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
        </pre>
      </div>
    </div>
  );
}

function TestCases({ publicTests, privateTests, results }: { publicTests: TestCase[]; privateTests: TestCase[]; results?: boolean[] }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Test Cases</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Public Tests</h3>
        {publicTests.map((test, index) => (
          <div key={index} className="mb-4 bg-gray-800 rounded-lg p-4">
            <div className="mb-2">
              <span className="text-gray-400">Input:</span>
              <pre className="text-white">{test.input}</pre>
            </div>
            <div>
              <span className="text-gray-400">Expected Output:</span>
              <pre className="text-white">{test.output}</pre>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Private Tests</h3>
        {privateTests.map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">Test {index + 1}:</span>
            {results ? (
              <span className={results[index] ? 'text-green-500' : 'text-red-500'}>
                {results[index] ? '✓ Passed' : '✗ Failed'}
              </span>
            ) : (
              <span className="text-gray-400">Not run yet</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Console({ result }: { result: CodeExecutionResult | null }) {
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="flex items-center mb-2">
        <Terminal className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Console Output</h3>
      </div>
      
      {result ? (
        <div>
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {result.output}
          </pre>
          {result.executionTime && (
            <div className="mt-2 text-xs text-gray-400">
              Execution Time: {result.executionTime}ms | 
              Memory Usage: {result.memoryUsage}MB
            </div>
          )}
          {result.testCasesPassed !== undefined && (
            <div className="mt-2 text-sm">
              Test Cases: {result.testCasesPassed}/{result.totalTestCases} passed
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500 italic">No output yet</div>
      )}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(INITIAL_CODE);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleRunCode = () => {
    setResult({
      status: 'success',
      output: 'Test case 1 passed!\nTest case 2 passed!',
      executionTime: 42,
      memoryUsage: 3.14,
      testCasesPassed: 2,
      totalTestCases: 2,
    });
  };

  const handleSubmit = () => {
    setResult({
      status: 'success',
      output: 'All test cases passed!',
      executionTime: 45,
      memoryUsage: 3.2,
      testCasesPassed: 4,
      totalTestCases: 4,
    });
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="h-12 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunCode}
            className="flex items-center px-4 py-1.5 bg-green-600 hover:bg-green-700 rounded-md"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit
          </button>
        </div>
      </div>

      <Split
        className="h-[calc(100vh-3rem)]"
        sizes={[50, 50]}
        minSize={300}
        gutterSize={8}
        gutterStyle={() => ({
          backgroundColor: '#374151',
        })}
      >
        <div className="h-full flex flex-col">
          <Editor
            language={language}
            code={code}
            onChange={(value) => setCode(value || '')}
          />
          <div className="h-1/3 bg-gray-800 border-t border-gray-700">
            <Console result={result} />
          </div>
        </div>

        <div className="h-full flex flex-col bg-gray-800">
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex border-b border-gray-700">
              <button
                className={`px-4 py-2 ${
                  !showLeaderboard ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setShowLeaderboard(false)}
              >
                Problem
              </button>
              <button
                className={`px-4 py-2 flex items-center ${
                  showLeaderboard ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setShowLeaderboard(true)}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </button>
            </div>

            {showLeaderboard ? (
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Top Submissions</h2>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-semibold mr-4">
                          #{i + 1}
                        </span>
                        <span>User{i + 1}</span>
                      </div>
                      <div className="text-gray-400">
                        {40 + i}ms | {3.1 + i * 0.1}MB
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <ProblemStatement />
                <div className="border-t border-gray-700">
                  <TestCases
                    publicTests={PUBLIC_TESTS}
                    privateTests={PRIVATE_TESTS}
                    results={result ? [true, true, true, true] : undefined}
                  />
                </div>
              </>
            )}
          </div>

          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussion
              </h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="text-sm text-gray-400">
              Join the discussion to get help or share your approach!
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}

export default App;