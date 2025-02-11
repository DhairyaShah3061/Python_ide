import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Language } from '../types';

interface EditorProps {
  language: Language;
  code: string;
  onChange: (value: string | undefined) => void;
}

export function Editor({ language, code, onChange }: EditorProps) {
  const getLanguageId = (lang: Language) => {
    switch (lang) {
      case 'cpp':
        return 'cpp';
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      default:
        return 'javascript';
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