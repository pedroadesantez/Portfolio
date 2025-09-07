'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUp, Heart, MapPin, Clock, Mail, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import siteData from '@/data/site-data.json'
import { cn } from '@/lib/utils'
import ClientOnly from './ClientOnly'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Show scroll to top button when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update current time in user's timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi', // EAT timezone
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteData.contact.github,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: siteData.contact.linkedin,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: siteData.social.twitter,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: `mailto:${siteData.contact.email}`,
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <footer className="relative border-t border-glass-border bg-surface/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link
                href="/"
                className="text-gradient mb-4 block rounded-md font-display text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {siteData.name}
              </Link>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-text-secondary">
                {siteData.headline}. Always open to new opportunities and
                exciting projects.
              </p>

              {/* Availability Status */}
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent-400"></div>
                <span className="text-sm text-text-secondary">
                  {siteData.settings.availability}
                </span>
              </div>

              {/* Location & Time */}
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{siteData.contact.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <ClientOnly fallback={
                    <span>Local time: -- ({siteData.settings.timezone})</span>
                  }>
                    <span>
                      Local time: {currentTime} ({siteData.settings.timezone})
                    </span>
                  </ClientOnly>
                </div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Navigate
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="rounded-md text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Connect
              </h3>

              {/* Contact Info */}
              <div className="mb-6 space-y-3">
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="flex items-center space-x-2 rounded-md text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{siteData.contact.email}</span>
                </a>
                <a
                  href={`tel:${siteData.contact.phone}`}
                  className="flex items-center space-x-2 rounded-md text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{siteData.contact.phone}</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg p-2 text-text-secondary transition-all duration-200 hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label={`Visit ${item.name} profile`}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between space-y-4 border-t border-glass-border py-6 sm:flex-row sm:space-y-0"
        >
          <div className="flex items-center space-x-1 text-sm text-text-secondary">
            <span>© 2025 {siteData.name}. Built with</span>
            <Heart className="h-4 w-4 text-accent-400" />
            <span>and Next.js</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-text-secondary">
            <Link
              href="/privacy"
              className="rounded-md transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-md transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Terms
            </Link>
            <button
              onClick={() => {
                // TODO: Implement animation toggle functionality
                // This would typically connect to a settings context to toggle animations
              }}
              className="rounded-md transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Accessibility
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <ClientOnly>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
            !showScrollTop && 'pointer-events-none'
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </ClientOnly>
    </footer>
  )
}
