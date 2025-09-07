/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development-friendly configuration
  // Security headers are relaxed for development to allow Next.js assets to load properly
  // For production deployment, consider implementing stricter headers at the CDN/server level
  images: {
    unoptimized: true, // Disable for now to prevent 400 errors with placeholder images
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable static generation for CI/CD deployment
  ...(process.env.NODE_ENV === 'production' &&
    process.env.STATIC_EXPORT && {
      output: 'export',
      distDir: 'out',
      trailingSlash: true,
    }),
  // For development and normal production builds
  ...(!(process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT) && {
    trailingSlash: false, // Better for modern hosting platforms
  }),
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
            // Content Security Policy - relaxed for development
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://cdn.jsdelivr.net https://unpkg.com", // Allow localhost and CDN
                "style-src 'self' 'unsafe-inline' http://localhost:* https://fonts.googleapis.com", // Allow localhost styles
                "font-src 'self' https://fonts.gstatic.com data:",
                "img-src 'self' data: blob: http://localhost:* https:", // Allow localhost images
                "media-src 'self' data: blob:",
                "object-src 'none'",
                "connect-src 'self' http://localhost:* https:", // Allow localhost connections
                "frame-src 'none'",
                "form-action 'self'",
                "base-uri 'self'",
                // Remove upgrade-insecure-requests for development
              ].join('; '),
            },
            // HSTS disabled for development (localhost uses HTTP)
            // {
            //   key: 'Strict-Transport-Security',
            //   value: 'max-age=63072000; includeSubDomains; preload',
            // },
            // Prevent clickjacking attacks
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            // Prevent MIME type sniffing
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // Enable XSS protection
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            // Control referrer information
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
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
                'xr-spatial-tracking=()',
              ].join(', '),
            },
            // Relaxed cross-origin policies for development
            // Note: These are disabled in development to allow Next.js dev server to work
            // {
            //   key: 'Cross-Origin-Embedder-Policy',
            //   value: 'require-corp',
            // },
            // {
            //   key: 'Cross-Origin-Opener-Policy',
            //   value: 'same-origin',
            // },
            // {
            //   key: 'Cross-Origin-Resource-Policy',
            //   value: 'same-origin',
            // },
            // Cache control for security
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ]
    },
  }),
  // Additional security configurations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
}

module.exports = nextConfig
