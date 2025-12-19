import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
}

export default function CodeBlock({ children, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={handleCopy}
          className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 hover:scale-110 shadow-md"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
          ) : (
            <Copy className="w-4 h-4" strokeWidth={2.5} />
          )}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto border border-gray-700 shadow-lg">
        <code className={`language-${language} text-sm`}>{children}</code>
      </pre>
    </div>
  );
}
