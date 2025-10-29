import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const [width, height] = params.params[0].split('/').map(Number)
  
  // Générer une image placeholder SVG
  const svg = `
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f3f8"/>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#17E668;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#4ae3c1;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Inter, sans-serif" font-size="16" fill="#6B7280">
        ${width || 400} × ${height || 300}
      </text>
    </svg>
  `

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}
