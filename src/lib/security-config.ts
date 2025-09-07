/**
 * Security configuration utilities
 */

export interface SecurityConfig {
  csp: {
    reportUri?: string
    reportOnly: boolean
  }
  rateLimit: {
    enabled: boolean
    contactForm: {
      windowMs: number
      maxAttempts: number
    }
  }
  headers: {
    enabled: boolean
    hsts: {
      maxAge: number
      includeSubDomains: boolean
      preload: boolean
    }
  }
  https: {
    forceHttps: boolean
    secureCookies: boolean
  }
  email: {
    serviceEnabled: boolean
    provider?: string
  }
  botProtection: {
    enabled: boolean
    honeypotEnabled: boolean
  }
  monitoring: {
    enabled: boolean
    webhookUrl?: string
  }
  development: {
    securityDebug: boolean
    bypassHttps: boolean
  }
  allowedOrigins: string[]
}

/**
 * Get security configuration from environment variables
 */
export function getSecurityConfig(): SecurityConfig {
  return {
    csp: {
      reportUri: process.env.NEXT_PUBLIC_CSP_REPORT_URI,
      reportOnly: process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === 'true',
    },
    rateLimit: {
      enabled: process.env.NEXT_PUBLIC_RATE_LIMIT_ENABLED !== 'false',
      contactForm: {
        windowMs: parseInt(
          process.env.NEXT_PUBLIC_RATE_LIMIT_CONTACT_FORM_WINDOW_MS || '900000'
        ),
        maxAttempts: parseInt(
          process.env.NEXT_PUBLIC_RATE_LIMIT_CONTACT_FORM_MAX_ATTEMPTS || '3'
        ),
      },
    },
    headers: {
      enabled: process.env.NEXT_PUBLIC_SECURITY_HEADERS_ENABLED !== 'false',
      hsts: {
        maxAge: parseInt(process.env.NEXT_PUBLIC_HSTS_MAX_AGE || '63072000'),
        includeSubDomains:
          process.env.NEXT_PUBLIC_HSTS_INCLUDE_SUBDOMAINS !== 'false',
        preload: process.env.NEXT_PUBLIC_HSTS_PRELOAD !== 'false',
      },
    },
    https: {
      forceHttps: process.env.NEXT_PUBLIC_FORCE_HTTPS !== 'false',
      secureCookies: process.env.NEXT_PUBLIC_SECURE_COOKIES !== 'false',
    },
    email: {
      serviceEnabled: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ENABLED === 'true',
      provider: process.env.NEXT_PUBLIC_EMAIL_SERVICE_PROVIDER,
    },
    botProtection: {
      enabled: process.env.NEXT_PUBLIC_BOT_PROTECTION_ENABLED !== 'false',
      honeypotEnabled: process.env.NEXT_PUBLIC_HONEYPOT_ENABLED !== 'false',
    },
    monitoring: {
      enabled: process.env.NEXT_PUBLIC_SECURITY_MONITORING_ENABLED === 'true',
      webhookUrl: process.env.SECURITY_MONITORING_WEBHOOK_URL,
    },
    development: {
      securityDebug: process.env.NEXT_PUBLIC_SECURITY_DEBUG === 'true',
      bypassHttps: process.env.NEXT_PUBLIC_SECURITY_BYPASS_HTTPS === 'true',
    },
    allowedOrigins: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || [
      'https://localhost:3000',
    ],
  }
}

/**
 * Validate security configuration
 */
export function validateSecurityConfig(config: SecurityConfig): string[] {
  const warnings: string[] = []

  if (process.env.NODE_ENV === 'production') {
    if (config.development.securityDebug) {
      warnings.push('Security debug mode is enabled in production')
    }

    if (config.development.bypassHttps) {
      warnings.push('HTTPS bypass is enabled in production')
    }

    if (!config.https.forceHttps) {
      warnings.push('HTTPS enforcement is disabled in production')
    }

    if (!config.rateLimit.enabled) {
      warnings.push('Rate limiting is disabled in production')
    }

    if (!config.botProtection.enabled) {
      warnings.push('Bot protection is disabled in production')
    }

    if (config.allowedOrigins.includes('http://localhost:3000')) {
      warnings.push('localhost is in allowed origins in production')
    }

    if (
      !process.env.SECURITY_TOKEN_SALT ||
      process.env.SECURITY_TOKEN_SALT ===
        'your-random-salt-here-change-this-in-production'
    ) {
      warnings.push(
        'Security token salt is not configured or using default value'
      )
    }
  }

  return warnings
}

/**
 * Security configuration constants
 */
export const SECURITY_CONSTANTS = {
  MINIMUM_PASSWORD_LENGTH: 12,
  MAXIMUM_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  CSRF_TOKEN_LENGTH: 32,
  SECURITY_HEADERS: {
    CONTENT_TYPE_OPTIONS: 'nosniff',
    FRAME_OPTIONS: 'DENY',
    XSS_PROTECTION: '1; mode=block',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
  },
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
  ],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  RATE_LIMITS: {
    GLOBAL: { windowMs: 15 * 60 * 1000, maxRequests: 100 },
    AUTH: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
    API: { windowMs: 60 * 1000, maxRequests: 30 },
    CONTACT: { windowMs: 15 * 60 * 1000, maxRequests: 3 },
  },
} as const

/**
 * Get environment-specific security recommendations
 */
export function getSecurityRecommendations(): string[] {
  const config = getSecurityConfig()
  const warnings = validateSecurityConfig(config)
  const recommendations: string[] = []

  if (warnings.length > 0) {
    recommendations.push('Review and fix security configuration warnings')
  }

  if (!config.monitoring.enabled) {
    recommendations.push('Consider enabling security monitoring for production')
  }

  if (!config.email.serviceEnabled) {
    recommendations.push(
      'Configure email service for contact form functionality'
    )
  }

  if (config.csp.reportUri) {
    recommendations.push('Monitor CSP violation reports for security insights')
  }

  recommendations.push(
    'Regularly update dependencies to patch security vulnerabilities'
  )
  recommendations.push(
    'Implement proper logging and monitoring for security events'
  )
  recommendations.push(
    'Consider implementing CAPTCHA for additional bot protection'
  )
  recommendations.push(
    'Regularly review and rotate security tokens and API keys'
  )

  return recommendations
}

/**
 * Check if the current environment is secure
 */
export function isEnvironmentSecure(): boolean {
  if (typeof window === 'undefined') {
    return true // Server-side is assumed secure
  }

  const config = getSecurityConfig()
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'

  if (process.env.NODE_ENV === 'development' && isLocalhost) {
    return (
      config.development.bypassHttps || window.location.protocol === 'https:'
    )
  }

  return window.location.protocol === 'https:'
}
