import React from 'react';
import { CodeExecutionResult } from '../types';
import { Terminal } from 'lucide-react';

interface ConsoleProps {
  result: CodeExecutionResult | null;
}

export function Console({ result }: ConsoleProps) {
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