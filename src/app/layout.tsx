import type { Metadata } from 'next'
import '../styles/globals.css'
import siteData from '@/data/site-data.json'

export const metadata: Metadata = {
  title: {
    default: `${siteData.name} | ${siteData.role}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.headline,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'software developer',
    'full-stack developer',
    'React',
    'Next.js',
    'TypeScript',
    'portfolio',
    'web development',
    'UI/UX',
    'computer science',
    siteData.name.toLowerCase().replace(' ', '-'),
  ],
  authors: [{ name: siteData.name, url: siteData.social.portfolio }],
  creator: siteData.name,
  publisher: siteData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteData.social.portfolio || 'https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteData.social.portfolio || 'https://localhost:3000',
    siteName: siteData.name,
    title: `${siteData.name} | ${siteData.role}`,
    description: siteData.headline,
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteData.name} - ${siteData.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.name} | ${siteData.role}`,
    description: siteData.headline,
    images: ['/assets/og-image.jpg'],
    creator: '@ps_dev_ke',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="min-h-screen bg-background text-text-primary antialiased"
        suppressHydrationWarning
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-primary-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          Skip to main content
        </a>

        {/* Enhanced Background gradient effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute left-0 top-0 h-96 w-96 animate-pulse-slow rounded-full bg-primary-500/15 opacity-40 blur-3xl"></div>
          <div
            className="absolute bottom-0 right-0 h-96 w-96 animate-pulse-slow rounded-full bg-accent-400/15 opacity-40 blur-3xl"
            style={{ animationDelay: '2s' }}
          ></div>
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-30 blur-3xl"></div>
          <div
            className="bg-primary-400/8 absolute right-1/4 top-1/4 h-64 w-64 animate-pulse-slow rounded-full opacity-25 blur-2xl"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <main id="main-content">{children}</main>

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteData.name,
              jobTitle: siteData.role,
              description: siteData.about,
              url: siteData.social.portfolio,
              email: siteData.contact.email,
              telephone: siteData.contact.phone,
              address: {
                '@type': 'PostalAddress',
                addressLocality: siteData.contact.location,
              },
              sameAs: [
                siteData.contact.linkedin,
                siteData.contact.github,
                siteData.social.twitter,
              ],
              knowsAbout: siteData.skills.languages
                .map((l) => l.name)
                .concat(
                  siteData.skills.frameworks.map((f) => f.name),
                  siteData.skills.tools.map((t) => t.name)
                ),
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: siteData.education[0].institution,
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
