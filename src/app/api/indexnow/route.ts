import { NextResponse } from 'next/server';

const HOST = 'rhemicai.com';

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return NextResponse.json(
      { error: 'IndexNow key not configured' },
      { status: 503 }
    );
  }

  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array required' }, { status: 400 });
    }

    const urlList = urls.slice(0, 10000).map((u: string) =>
      u.startsWith('http') ? u : `https://${HOST}${u}`
    );

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key,
        urlList,
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      submitted: urlList.length,
    });
  } catch {
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}
