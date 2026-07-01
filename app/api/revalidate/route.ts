import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// On-demand revalidation triggered by Sanity webhook
// Sanity Dashboard → API → Webhooks → URL: https://yoursite.com/api/revalidate
// Set secret in Sanity webhook and SANITY_REVALIDATE_SECRET env var
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type } = body

    switch (_type) {
      case 'project':
        revalidatePath('/projects')
        revalidateTag('project')
        break
      default:
        revalidatePath('/')
        break
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
