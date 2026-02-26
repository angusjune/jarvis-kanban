import { NextResponse } from 'next/server';

export async function GET() {
  const repo = 'angusjune/jarvis-kanban';
  const url = `https://api.github.com/repos/${repo}/issues?state=all&per_page=100`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Optional: Add GitHub Token here if needed for higher rate limits or private repos
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
      next: { revalidate: 10 } // Cache for 10s
    });
    
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const issues = await res.json();
    
    const tasks = {
      todo: [],
      in_progress: [],
      done: []
    };

    issues.forEach((issue: any) => {
      // Skip Pull Requests
      if (issue.pull_request) return;

      const labels = issue.labels.map((l: any) => l.name.toLowerCase());
      const task = { id: issue.id, title: issue.title, status: 'todo' };

      if (issue.state === 'closed' || labels.includes('done')) {
        task.status = 'done';
        tasks.done.push(task);
      } else if (labels.includes('doing') || labels.includes('in-progress')) {
        task.status = 'in_progress';
        tasks.in_progress.push(task);
      } else {
        // Default to To Do
        tasks.todo.push(task);
      }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    // Return empty state or error
    return NextResponse.json({ todo: [], in_progress: [], done: [] }, { status: 500 });
  }
}
