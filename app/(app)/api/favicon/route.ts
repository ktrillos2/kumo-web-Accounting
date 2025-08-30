import { NextRequest } from 'next/server'
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest) {
  try {
    // Obtener logo desde Sanity
    const general = await client.fetch(`*[_type=="generalSettings" && _id=="general-settings-singleton"][0]{logo}`)

    let srcUrl: string | null = null
    if (general?.logo) {
      srcUrl = urlFor(general.logo).width(256).height(256).format('png').url()
    }

    // Fallback a logo local si no hay en Sanity
  if (!srcUrl) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'logo.png')
        const buf = await fs.readFile(filePath)
        const out = await sharp(buf).negate({ alpha: false }).png().toBuffer()
    const ab = out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength)
    return new Response(ab as ArrayBuffer, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          },
        })
      } catch {
        return new Response(null, { status: 404 })
      }
    }

    const resp = await fetch(srcUrl)
    if (!resp.ok) return new Response(null, { status: 502 })
    const input = Buffer.from(await resp.arrayBuffer())
    const output = await sharp(input).negate({ alpha: false }).png().toBuffer()

  const ab = output.buffer.slice(output.byteOffset, output.byteOffset + output.byteLength)
  return new Response(ab as ArrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (e) {
    return new Response(null, { status: 500 })
  }
}
