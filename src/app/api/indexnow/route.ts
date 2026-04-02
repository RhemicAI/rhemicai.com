import { NextResponse } from 'next/server';

const INDEXNOW_KEY = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6';
const HOST = 'rhemicai.com';

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 });
    }

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        urlList: urls.map((u: string) =>
          u.startsWith('http') ? u : `https://${HOST}${u}`
        ),
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
    });
  } catch {
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    host: HOST,
    endpoint: 'POST /api/indexnow with { urls: string[] }',
  });
}
