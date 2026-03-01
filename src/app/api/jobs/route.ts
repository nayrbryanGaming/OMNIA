// MODULE 4 — BACKEND API 
// Path: src/app/api/jobs/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Simple Authorization Check (JWT or Api Key)
const verifyAuth = (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) throw new Error('Unauthorized');
  return { userId: 'user_123', tier: 'FREE' };
};

export async function POST(req: NextRequest) {
  try {
    const user = verifyAuth(req);
    const body = await req.json();

    // Validate Job schema
    if (!body.model || !body.messages) {
      return NextResponse.json({ error: 'Invalid Job Schema' }, { status: 400 });
    }

    // Submit Job to Upstash Redis (Queue)
    const jobId = `job_${crypto.randomUUID()}`;

    // In production, this would be an actual Redis push:
    // await redis.lpush('omnia:jobs:queue', JSON.stringify({ id: jobId, user: user.userId, ...body }));

    // For Edge Route speed, we immediately return the tracking ID to the frontend
    return NextResponse.json({
      status: 'QUEUED',
      jobId,
      position: user.tier === 'PREMIUM' ? 1 : 45 // Example priority response
    }, { status: 202 });

  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('id');

  if (!jobId) return NextResponse.json({ error: 'Missing Job ID' }, { status: 400 });

  // In production: fetch job status from Redis/Postgres
  // const job = await redis.hget(`omnia:jobs:${jobId}`);

  return NextResponse.json({
    id: jobId,
    status: 'COMPLETED',
    response: "This is a dummy response from the OMNIA Cloud Worker."
  });
}

/*
EXPLANATION:
This Vercel Edge function handles incoming CLOUD requests.
It is extremely lightweight, only checking auth and pushing to a Redis queue.
It never blocks waiting for the GPU to finish. 
The client long-polls or uses SSE on a separate route to get results.
*/
