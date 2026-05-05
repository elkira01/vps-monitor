// app/api/vps-metrics/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'          // not edge — edge can't reach plain HTTP IPs
export const dynamic = 'force-dynamic'   // never cache

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'VPS URL parameter is required' }, { status: 400 })
  }

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Agent returned ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.log({err})
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'fetch failed' },
      { status: 502 }
    )
  }
}