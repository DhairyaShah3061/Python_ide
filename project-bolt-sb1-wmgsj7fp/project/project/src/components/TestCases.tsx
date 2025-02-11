import React from 'react';
import { TestCase } from '../types';

interface TestCasesProps {
  publicTests: TestCase[];
  privateTests: TestCase[];
  results?: boolean[];
}

export function TestCases({ publicTests, privateTests, results }: TestCasesProps) {
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