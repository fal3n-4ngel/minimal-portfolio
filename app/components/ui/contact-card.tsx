import React, { useState } from 'react';

export const ContactCard: React.FC = () => {
  const [copied, setCopied] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="w-96 h-96  rounded-lg p-8 flex flex-col justify-center items-start text-black font-mono">
      <h2 className="text-xl font-bold mb-8 text-center">Adithya Krishnan</h2>
      
      <div className="space-y-4 text-sm">
        <div 
          className="cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => copyToClipboard('hello@adithyakrishnana.com')}
          title="Click to copy"
        >
          {copied === 'hello@adithyakrishnana.com' ? '✓ Copied!' : 'hello@adithyakrishnana.com'}
        </div>
        
        <div 
          className="cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => copyToClipboard('fal3n-4ngel')}
          title="Click to copy"
        >
          {copied === 'fal3n-4ngel' ? '✓ Copied!' : 'github: fal3n-4ngel'}
        </div>
        
        <a 
          href="https://www.adithyakrishnan.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:text-blue-400 transition-colors"
        >
          www.adithyakrishnan.com
        </a>
      </div>
    </div>
  );
};

export default ContactCard;