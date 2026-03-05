// MODULE 4 — BACKEND API (Next.js Edge Route)
// Path: src/app/api/jobs/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Pseudo DB for Job Polling
const JOB_DB = new Map<string, any>();

async function verifyAuth(request: Request) {
  // Auth skeleton: Expects a Bearer token or session cookie
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer OMNIA_')) {
    throw new Error('Unauthorized');
  }
  return { userId: 'usr_2026', tier: 'FREE_CLOUD' };
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request);
    const body = await request.json();

    // 1. Job Submission
    const jobId = crypto.randomUUID();

    // 2. Queue placement logic (Mock Upstash Redis here)
    JOB_DB.set(jobId, { status: 'QUEUED', user: user.userId, request: body });

    // 3. Return Job ID immediately to avoid Vercel 10s timeout
    return NextResponse.json({ jobId, status: 'QUEUED' }, { status: 202 });
  } catch (e: any) {
    // 4. Error Normalization
    return NextResponse.json({
      error: {
        code: e.message === 'Unauthorized' ? 401 : 500,
        message: e.message || 'Internal Queue Error'
      }
    }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');

  // 5. Job Status Polling
  if (!jobId || !JOB_DB.has(jobId)) {
    return NextResponse.json({ error: { code: 404, message: "Job not found" } }, { status: 404 });
  }

  const job = JOB_DB.get(jobId);

  // Simulate resolution
  if (job.status === 'QUEUED') {
    job.status = 'COMPLETED';
    job.result = { content: "This is a deferred cloud response." };
  }

  return NextResponse.json(job);
}

/*
EXPLANATION:
This module demonstrates the async polling architecture required for Vercel Edge.
Long-running AI jobs CANNOT hold the connection open.
The client POSTs a job, immediately receives a 202 Accepted with a JobId, 
and then GET polls this endpoint to retrieve the result.
Auth headers are validated at the Edge.
*/
