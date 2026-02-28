'use client';

import { useState } from 'react';

export default function Slicer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would call your backend endpoint
    // await fetch('/api/slice', { method: 'POST', body: JSON.stringify({ url }) })
    
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      setResult('https://example.com/clip-1.mp4');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <header className="mb-12 border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-bold text-cyan-500 tracking-tighter">CONTENT // SLICER</h1>
        <p className="text-gray-500 text-sm mt-2">AUTONOMOUS VIDEO CLIPPING ENGINE</p>
      </header>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">TARGET YOUTUBE URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-gray-900 border border-gray-700 p-4 rounded text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded font-bold tracking-widest transition-all ${
              loading
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]'
            }`}
          >
            {loading ? 'PROCESSING STREAM...' : 'INITIATE SEQUENCE'}
          </button>
        </form>

        {loading && (
          <div className="mt-8 space-y-2">
            <div className="h-1 w-full bg-gray-800 overflow-hidden rounded">
              <div className="h-full bg-cyan-500 animate-[shimmer_2s_infinite] w-1/3"></div>
            </div>
            <p className="text-xs text-cyan-500/70 animate-pulse">Analyzing audio spectrum... Identifying viral hooks...</p>
          </div>
        )}

        {result && (
          <div className="mt-12 bg-gray-900 border border-green-500/30 p-6 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <h3 className="text-green-400 font-bold mb-4">OPERATION SUCCESSFUL</h3>
            <p className="text-gray-400 text-sm mb-4">Clip extracted successfully.</p>
            <div className="aspect-[9/16] bg-black w-32 mx-auto border border-gray-800 flex items-center justify-center text-gray-600">
              PREVIEW
            </div>
            <button className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white p-2 rounded text-sm border border-gray-600">
              DOWNLOAD ASSETS (.ZIP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
