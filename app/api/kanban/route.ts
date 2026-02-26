import { NextResponse } from 'next/server';

export async function GET() {
  // In a real scenario, this would fetch from GitHub API for live updates.
  // For this demo, we'll read a local file or return a static mock until the repo is set up.
  // Ideally: fetch('https://raw.githubusercontent.com/angus-zhu/clawd/main/KANBAN.md')
  
  const tasks = {
    todo: [
      { id: 1, title: 'Research revenue streams', status: 'todo' },
      { id: 2, title: 'Build new app features', status: 'todo' },
      { id: 3, title: 'Schedule social content', status: 'todo' },
      { id: 4, title: 'Build surprise MVP', status: 'todo' },
    ],
    in_progress: [],
    done: []
  };

  return NextResponse.json(tasks);
}
