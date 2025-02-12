import Sk from 'skulpt';

export const initializeSkulpt = () => {
  Sk.configure({
    output: (text: string) => {
      console.log('Python output:', text);
      return text;
    },
    read: (filename: string) => {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined)
        throw "File not found: '" + filename + "'";
      return Sk.builtinFiles["files"][filename];
    }
  });
};

export const runPython = async (code: string): Promise<string> => {
  let output = '';
  
  Sk.configure({
    output: (text: string) => {
      output += text;
      return text;
    },
    __future__: Sk.python3
  });

  try {
    await Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    return output;
  } catch (error) {
    return `Error: ${error.toString()}`;
  }
};