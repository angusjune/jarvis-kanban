'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
}

interface KanbanData {
  todo: Task[];
  in_progress: Task[];
  done: Task[];
}

export default function KanbanBoard() {
  const { data, error, isLoading } = useSWR<KanbanData>('/api/kanban', fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500 p-10">Failed to load tasks. Check API.</div>;
  if (isLoading) return <div className="text-cyan-500 p-10 animate-pulse">Initializing Jarvis Systems...</div>;

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-8">
      <header className="mb-8 flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-cyan-500 tracking-tighter">JARVIS // KANBAN</h1>
        <div className="text-xs text-gray-500">Live Updates: ON</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <Column title="TO DO" tasks={data?.todo || []} color="border-cyan-500/30" badge="bg-cyan-900/20 text-cyan-400" />
        
        {/* In Progress Column */}
        <Column title="IN PROGRESS" tasks={data?.in_progress || []} color="border-yellow-500/30" badge="bg-yellow-900/20 text-yellow-400" />
        
        {/* Done Column */}
        <Column title="DONE" tasks={data?.done || []} color="border-green-500/30" badge="bg-green-900/20 text-green-400" />
      </div>

      <footer className="fixed bottom-4 right-4 text-[10px] text-gray-700">
        SYSTEM: ONLINE | REVENUE GOAL: $10K/MO
      </footer>
    </div>
  );
}

function Column({ title, tasks, color, badge }: { title: string; tasks: Task[]; color: string; badge: string }) {
  return (
    <div className={`bg-gray-900/50 rounded-lg p-4 border ${color} min-h-[500px]`}>
      <h2 className={`text-sm font-bold mb-4 px-2 py-1 rounded w-fit ${badge}`}>{title} ({tasks.length})</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-800 p-4 rounded border-l-2 border-gray-700 hover:border-cyan-500 transition-colors cursor-default shadow-lg">
            <p className="text-sm font-medium">{task.title}</p>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-xs text-gray-600 italic px-2">No active directives.</p>}
      </div>
    </div>
  );
}
