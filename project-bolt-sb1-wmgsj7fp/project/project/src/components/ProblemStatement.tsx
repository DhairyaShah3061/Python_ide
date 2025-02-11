import React from 'react';

export function ProblemStatement() {
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