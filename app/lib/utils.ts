import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const generateUserId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

export const generateAnonymousName = (): string => {
  const adjectives: string[] = ['Anonymous', 'Guest', 'Visitor', 'User', 'Client', 'Terminal', 'Node', 'Entity', 'Shadow', 'Echo'];
  const numbers: string = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  return `${randomAdjective}${numbers}`;
};


export const getUserIdentifier = async () => {
  try {
    // Try to get IP address from a public API
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    console.warn('Could not fetch IP, using browser fingerprint');
    // Fallback to browser fingerprint
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let fingerprint: string;
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
      fingerprint = canvas.toDataURL() + 
                   navigator.userAgent + 
                   navigator.language + 
                   screen.width + 
                   screen.height + 
                   new Date().getTimezoneOffset();
    } else {
      fingerprint = navigator.userAgent + 
                   navigator.language + 
                   screen.width + 
                   screen.height + 
                   new Date().getTimezoneOffset();
    }
    
    // Create a simple hash
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return 'fp_' + Math.abs(hash).toString(36);
  }
};
