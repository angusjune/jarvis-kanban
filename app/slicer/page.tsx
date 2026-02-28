'use client';

import { useState } from 'react';

export default function ContentSlicer() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [clipUrl, setClipUrl] = useState('');

  const handleSlice = async () => {
    if (!url) return;
    setStatus('processing');
    setClipUrl('');
    
    try {
      const res = await fetch('/api/slice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to slice');
      }

      // Handle Blob Response
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      setClipUrl(objectUrl);
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-cyan-500 mb-8 tracking-tighter">CONTENT // SLICER</h1>
      
      <div className="w-full max-w-lg space-y-4">
        <input 
          type="text" 
          placeholder="Paste YouTube URL..." 
          className="w-full bg-gray-900 border border-gray-700 p-4 rounded text-white focus:outline-none focus:border-cyan-500 transition-colors"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        
        <button 
          onClick={handleSlice}
          disabled={status === 'processing'}
          className={`w-full p-4 rounded font-bold transition-all ${
            status === 'processing' 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-500 text-black'
          }`}
        >
          {status === 'processing' ? 'EXTRACTING INTELLIGENCE...' : 'INITIATE SLICE_PROTOCOL'}
        </button>

        {status === 'error' && (
          <div className="text-red-500 text-center text-sm">Protocol Failure. Check console.</div>
        )}

        {status === 'done' && clipUrl && (
          <div className="mt-8 p-4 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-green-400 text-sm mb-2">ASSET SECURED:</h3>
            <video src={clipUrl} controls className="w-full rounded border border-gray-800" />
            <a 
              href={clipUrl} 
              download="jarvis_clip.mp4"
              className="block text-center text-xs text-gray-500 mt-2 hover:text-white"
            >
              [DOWNLOAD ARTIFACT]
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
