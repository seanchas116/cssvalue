import { useState, useCallback, useEffect } from "react";
import { cssParser, Parser } from "@seanchas116/cssvalue";
import { format as prettyFormat } from "pretty-format";

type ParseResult =
  | {
      success: true;
      value: { toString(): string };
    }
  | {
      success: false;
      error: string;
    };

const PROPERTY_EXAMPLES = {
  background:
    'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")',
  border: "2px solid red",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 2px 4px #00000020",
  color: "rgb(255 128 0 / 0.5)",
  length: "100px",
  fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  gradient: "linear-gradient(45deg, red 0%, blue 50%, green 100%)",
} as const satisfies { [key in keyof typeof cssParser]?: string };

export type PropertyName = keyof typeof PROPERTY_EXAMPLES;
const PROPERTY_NAMES = Object.keys(PROPERTY_EXAMPLES) as PropertyName[];

function App() {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyName>("color");
  const [inputValue, setInputValue] = useState<string>(PROPERTY_EXAMPLES.color);
  const [parseResult, setParseResult] = useState<ParseResult>({
    success: false,
    error: "No Input",
  });

  const handleParse = useCallback(() => {
    if (!inputValue.trim()) {
      setParseResult({
        success: false,
        error: "No Input",
      });
      return;
    }

    try {
      const parser = cssParser[
        selectedProperty as keyof typeof cssParser
      ] as Parser<unknown>;
      const result = parser.tryParse(inputValue) as {
        toString(): string;
      };
      setParseResult({
        success: true,
        value: result,
      });
    } catch (error) {
      setParseResult({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }, [inputValue, selectedProperty]);

  useEffect(() => {
    handleParse();
  }, [handleParse]);

  const handlePropertyChange = (property: PropertyName) => {
    setSelectedProperty(property);
    setInputValue(PROPERTY_EXAMPLES[property]);
  };

  const formatParsedValue = (value: unknown): string => {
    return prettyFormat(value, {
      printFunctionName: false,
      highlight: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                @seanchas116/cssvalue
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Parse and analyze CSS property values with TypeScript
              </p>
            </div>
            <a
              href="https://github.com/seanchas116/cssvalue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Examples */}
        <div className="mb-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {PROPERTY_NAMES.map((prop) => (
                <button
                  key={prop}
                  onClick={() => handlePropertyChange(prop)}
                  className={`px-4 py-2.5 text-sm font-mono rounded-md border transition-all ${
                    selectedProperty === prop
                      ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm ring-1 ring-indigo-300"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {prop}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-medium text-slate-900">
                Input
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({selectedProperty})
                </span>
              </h2>
            </div>

            <div className="p-6">
              <textarea
                id="css-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter CSS value..."
                rows={10}
                className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-medium text-slate-900">Result</h2>
            </div>

            <div className="flex-1 p-6">
              <div className="h-full flex flex-col gap-4">
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    parseResult.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {parseResult.success ? (
                    <>
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Parsed Successfully
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Parse Error
                    </>
                  )}
                </span>

                {parseResult.success &&
                  parseResult.value &&
                  typeof parseResult.value === "object" &&
                  "toString" in parseResult.value &&
                  typeof parseResult.value.toString === "function" && (
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 mb-1">
                        Serialized:
                      </p>
                      <code className="block text-xs bg-slate-50 px-3 py-2 rounded border border-slate-200 font-mono text-slate-700 overflow-x-auto">
                        {parseResult.value.toString()}
                      </code>
                    </div>
                  )}

                {/* Parse Output */}
                {parseResult.success ? (
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">
                      Parsed Object:
                    </p>
                    <pre className="overflow-auto bg-slate-50 border border-slate-200 rounded-md p-4 text-xs font-mono text-slate-700 leading-relaxed">
                      {formatParsedValue(parseResult.value)}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-xs font-medium text-red-900 mb-2">
                      Error Details:
                    </p>
                    <pre className="text-xs font-mono text-red-700 whitespace-pre-wrap break-words">
                      {parseResult.error}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
