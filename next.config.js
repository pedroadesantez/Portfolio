/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost'],
  },
  // Enable static generation for better performance
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  // Optimize bundle
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Security headers (note: these won't work with static export, implement at server/CDN level)
  ...(process.env.NODE_ENV === 'development' && {
    async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          // Content Security Policy - strict policy for maximum security
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com", // Allow inline scripts for Next.js and CDN libs
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow inline styles for styled-components and Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:", // Allow images from self, data URIs, blobs, and HTTPS
              "media-src 'self' data: blob:",
              "object-src 'none'", // Prevent Flash and other plugins
              "connect-src 'self' https:", // Allow HTTPS connections for APIs
              "frame-src 'none'", // Prevent iframe embedding
              "form-action 'self'", // Only allow form submissions to same origin
              "base-uri 'self'", // Prevent base tag injection
              "upgrade-insecure-requests", // Automatically upgrade HTTP to HTTPS
            ].join('; ')
          },
          // HTTP Strict Transport Security - Force HTTPS for 2 years
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enable XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy (formerly Feature Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'accelerometer=()',
              'ambient-light-sensor=()',
              'autoplay=()',
              'battery=()',
              'camera=()',
              'cross-origin-isolated=()',
              'display-capture=()',
              'document-domain=()',
              'encrypted-media=()',
              'execution-while-not-rendered=()',
              'execution-while-out-of-viewport=()',
              'fullscreen=()',
              'geolocation=()',
              'gyroscope=()',
              'magnetometer=()',
              'microphone=()',
              'midi=()',
              'navigation-override=()',
              'payment=()',
              'picture-in-picture=()',
              'publickey-credentials-get=()',
              'screen-wake-lock=()',
              'sync-xhr=()',
              'usb=()',
              'web-share=()',
              'xr-spatial-tracking=()'
            ].join(', ')
          },
          // Prevent cross-origin information disclosure
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          // Isolate browsing context
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          // Control cross-origin resource sharing
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          // Cache control for security
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
    }
  }),
  // Additional security configurations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
}

module.exports = nextConfig