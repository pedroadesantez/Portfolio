import DOMPurify from 'dompurify'

/**
 * Security utilities for input validation and sanitization
 */

// Rate limiting configuration
export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxAttempts: number // Maximum attempts per window
}

// Default rate limiting configurations
export const RATE_LIMITS = {
  CONTACT_FORM: { windowMs: 15 * 60 * 1000, maxAttempts: 3 }, // 3 attempts per 15 minutes
  PAGE_VISITS: { windowMs: 60 * 1000, maxAttempts: 100 }, // 100 visits per minute
} as const

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return dirty
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  }

  // Client-side: use DOMPurify
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })
}

/**
 * Sanitize and validate text input
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength)

  // Remove potentially dangerous characters
  sanitized = sanitized
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol

  return sanitized
}

/**
 * Validate email format with additional security checks
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Basic email regex (RFC 5322 compliant)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  // Additional security checks
  const securityChecks = [
    email.length <= 254, // RFC limit
    !email.includes('..'), // No consecutive dots
    !email.startsWith('.'), // No leading dot
    !email.endsWith('.'), // No trailing dot
    !email.includes('<'), // No angle brackets
    !email.includes('>'), // No angle brackets
    !email.toLowerCase().includes('javascript'), // No javascript protocol
    !email.includes('data:'), // No data protocol
  ]

  return emailRegex.test(email) && securityChecks.every(Boolean)
}

/**
 * Rate limiting implementation for client-side
 */
export class ClientRateLimit {
  private attempts: Map<string, number[]> = new Map()

  /**
   * Check if action is allowed based on rate limit
   */
  isAllowed(key: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Get existing attempts for this key
    const keyAttempts = this.attempts.get(key) || []

    // Filter out old attempts outside the window
    const recentAttempts = keyAttempts.filter((time) => time > windowStart)

    // Update the attempts map
    this.attempts.set(key, recentAttempts)

    return recentAttempts.length < config.maxAttempts
  }

  /**
   * Record an attempt
   */
  recordAttempt(key: string): void {
    const now = Date.now()
    const keyAttempts = this.attempts.get(key) || []
    keyAttempts.push(now)
    this.attempts.set(key, keyAttempts)
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(key: string, config: RateLimitConfig): number {
    const now = Date.now()
    const windowStart = now - config.windowMs
    const keyAttempts = this.attempts.get(key) || []
    const recentAttempts = keyAttempts.filter((time) => time > windowStart)

    return Math.max(0, config.maxAttempts - recentAttempts.length)
  }

  /**
   * Get time until next attempt is allowed
   */
  getTimeUntilReset(key: string, config: RateLimitConfig): number {
    const keyAttempts = this.attempts.get(key) || []
    if (keyAttempts.length === 0) {
      return 0
    }

    const oldestAttempt = keyAttempts[0]
    const resetTime = oldestAttempt + config.windowMs
    const now = Date.now()

    return Math.max(0, resetTime - now)
  }
}

/**
 * Generate a secure random token for CSRF protection
 */
export function generateSecureToken(): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    )
  }

  // Client-side: use crypto.getRandomValues if available
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    )
  }

  // Fallback for older browsers
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

/**
 * Validate URL to ensure it's safe
 */
export function validateUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    const parsedUrl = new URL(url)

    // Only allow HTTP(S) protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:']
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return false
    }

    // Additional security checks for HTTP(S)
    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      // Prevent local network access
      const hostname = parsedUrl.hostname.toLowerCase()
      const localHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1']
      const isLocalNetwork =
        localHosts.includes(hostname) ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.16.') ||
        hostname.startsWith('172.17.') ||
        hostname.startsWith('172.18.') ||
        hostname.startsWith('172.19.') ||
        hostname.startsWith('172.2') ||
        hostname.startsWith('172.30.') ||
        hostname.startsWith('172.31.') ||
        hostname.startsWith('192.168.')

      if (isLocalNetwork && process.env.NODE_ENV === 'production') {
        return false
      }
    }

    return true
  } catch {
    return false
  }
}

/**
 * Content Security Policy nonce generator
 */
export function generateNonce(): string {
  if (typeof window === 'undefined') {
    // Server-side
    const crypto = require('crypto')
    return crypto.randomBytes(16).toString('base64')
  }

  // Client-side
  return generateSecureToken()
}

/**
 * Escape HTML entities
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Check if running in secure context
 */
export function isSecureContext(): boolean {
  if (typeof window === 'undefined') {
    return true // Assume secure on server
  }
  return window.isSecureContext || window.location.protocol === 'https:'
}

/**
 * Generate fingerprint for basic bot detection
 */
export function generateFingerprint(): string {
  if (typeof window === 'undefined') {
    return 'server'
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx?.fillText('Security fingerprint', 10, 10)

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join('|')

  // Simple hash function
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36)
}
