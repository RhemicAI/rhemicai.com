import { NextResponse } from 'next/server';

const HOST = 'rhemicai.com';

/**
 * IndexNow key. Published at https://rhemicai.com/ae7a82447267bd671e3b766281ba73e5.txt, so it is public
 * by design rather than a secret. Held in code so the endpoint cannot silently
 * no-op again when an env var is missing. INDEXNOW_KEY still overrides.
 */
const DEFAULT_KEY = 'ae7a82447267bd671e3b766281ba73e5';

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY ?? DEFAULT_KEY;

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
