import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getNetworkState, toggleRoadmapMilestone } from '@/lib/networkStore';
import { MINDMAP_MARKDOWN, MINDMAP_PILLARS } from '@/data/mindmapData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const state = getNetworkState();
  let canonicalTree = null;
  try {
    const jsonPath = path.join(process.cwd(), 'mindmap', 'mindmap.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    canonicalTree = JSON.parse(raw).tree;
  } catch {
    canonicalTree = null;
  }

  return NextResponse.json({
    title: 'Retail & Restaurant Drone Network',
    markdown: MINDMAP_MARKDOWN,
    pillars: MINDMAP_PILLARS,
    roadmapPhases: state.roadmapPhases,
    tree: canonicalTree,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.milestoneId) {
      return NextResponse.json({ error: 'milestoneId required' }, { status: 400 });
    }
    const updatedPhases = toggleRoadmapMilestone(body.milestoneId);
    return NextResponse.json({ ok: true, roadmapPhases: updatedPhases });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
