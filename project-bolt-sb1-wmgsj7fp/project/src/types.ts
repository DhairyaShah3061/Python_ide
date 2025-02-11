export type Language = 'javascript' | 'python' | 'cpp' | 'java';

export interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

export interface CodeExecutionResult {
  status: 'success' | 'error';
  output: string;
  executionTime?: number;
  memoryUsage?: number;
  testCasesPassed?: number;
  totalTestCases?: number;
}