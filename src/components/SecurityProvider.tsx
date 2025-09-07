'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  generateFingerprint,
  isSecureContext,
  ClientRateLimit,
} from '@/lib/security'

/**
 * Security context for managing application-wide security features
 */
interface SecurityContextType {
  fingerprint: string
  isSecure: boolean
  rateLimiter: ClientRateLimit
  securityScore: number
  reportSecurityEvent: (event: SecurityEvent) => void
  getSecurityRecommendations: () => string[]
}

interface SecurityEvent {
  type:
    | 'rate_limit'
    | 'xss_attempt'
    | 'csrf_attempt'
    | 'injection_attempt'
    | 'suspicious_activity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: string
  timestamp: Date
}

const SecurityContext = createContext<SecurityContextType | undefined>(
  undefined
)

interface SecurityProviderProps {
  children: ReactNode
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const [fingerprint, setFingerprint] = useState('')
  const [isSecure, setIsSecure] = useState(false)
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [rateLimiter] = useState(() => new ClientRateLimit())

  const checkForSecurityViolations = React.useCallback(() => {
    // Check for suspicious DOM modifications
    if (typeof window !== 'undefined') {
      // Check for suspicious script tags
      const suspiciousScripts = document.querySelectorAll(
        'script[src*="data:"], script[src^="javascript"], script[src^="vbscript"]'
      )
      if (suspiciousScripts.length > 0) {
        reportSecurityEvent({
          type: 'xss_attempt',
          severity: 'high',
          details: `Suspicious script tags detected: ${suspiciousScripts.length}`,
          timestamp: new Date(),
        })
      }

      // Check for suspicious input values
      const inputs = document.querySelectorAll('input, textarea')
      inputs.forEach((input) => {
        const value = (input as HTMLInputElement).value
        if (
          value &&
          (value.includes('<script') ||
            value.toLowerCase().includes('javascript') ||
            value.includes('data:text/html') ||
            value.includes('eval(') ||
            value.includes('document.cookie'))
        ) {
          reportSecurityEvent({
            type: 'xss_attempt',
            severity: 'medium',
            details: `Suspicious input detected in ${input.tagName}`,
            timestamp: new Date(),
          })
        }
      })
    }
  }, [])

  useEffect(() => {
    // Initialize security context
    setFingerprint(generateFingerprint())
    setIsSecure(isSecureContext())

    // Check for security violations on page load
    checkForSecurityViolations()

    // Set up periodic security checks
    const securityCheckInterval = setInterval(checkForSecurityViolations, 30000) // Every 30 seconds

    return () => clearInterval(securityCheckInterval)
  }, [checkForSecurityViolations])

  const reportSecurityEvent = (event: SecurityEvent) => {
    setSecurityEvents((prev) => [...prev.slice(-99), event]) // Keep last 100 events

    // Log security event in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('🔒 Security Event:', event)
    }

    // In production, you might want to send this to your security monitoring service
    if (
      process.env.NODE_ENV === 'production' &&
      event.severity === 'critical'
    ) {
      // Example: Send to security monitoring service
      // fetch('/api/security-events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // })
    }
  }

  const calculateSecurityScore = (): number => {
    let score = 100

    // Deduct points for security issues
    if (!isSecure) {
      score -= 20
    }
    if (securityEvents.some((e) => e.severity === 'critical')) {
      score -= 50
    }
    if (securityEvents.some((e) => e.severity === 'high')) {
      score -= 30
    }
    if (securityEvents.some((e) => e.severity === 'medium')) {
      score -= 15
    }
    if (securityEvents.some((e) => e.severity === 'low')) {
      score -= 5
    }

    // Deduct points for multiple recent events
    const recentEvents = securityEvents.filter(
      (e) => Date.now() - e.timestamp.getTime() < 5 * 60 * 1000 // Last 5 minutes
    )
    score -= Math.min(recentEvents.length * 5, 30)

    return Math.max(score, 0)
  }

  const getSecurityRecommendations = (): string[] => {
    const recommendations: string[] = []

    if (!isSecure) {
      recommendations.push('Use HTTPS to ensure secure data transmission')
    }

    if (securityEvents.some((e) => e.type === 'xss_attempt')) {
      recommendations.push('Review input validation and sanitization')
    }

    if (securityEvents.some((e) => e.type === 'rate_limit')) {
      recommendations.push('Consider implementing additional rate limiting')
    }

    if (securityEvents.some((e) => e.type === 'injection_attempt')) {
      recommendations.push('Implement Content Security Policy headers')
    }

    const recentEvents = securityEvents.filter(
      (e) => Date.now() - e.timestamp.getTime() < 10 * 60 * 1000 // Last 10 minutes
    )
    if (recentEvents.length > 5) {
      recommendations.push('Monitor for suspicious activity patterns')
    }

    if (recommendations.length === 0) {
      recommendations.push('Security status is good - continue monitoring')
    }

    return recommendations
  }

  const contextValue: SecurityContextType = {
    fingerprint,
    isSecure,
    rateLimiter,
    securityScore: calculateSecurityScore(),
    reportSecurityEvent,
    getSecurityRecommendations,
  }

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurityContext(): SecurityContextType {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider')
  }
  return context
}

/**
 * Hook for reporting security events
 */
export function useSecurityReporting() {
  const { reportSecurityEvent } = useSecurityContext()

  return {
    reportXSSAttempt: (details: string) =>
      reportSecurityEvent({
        type: 'xss_attempt',
        severity: 'high',
        details,
        timestamp: new Date(),
      }),
    reportCSRFAttempt: (details: string) =>
      reportSecurityEvent({
        type: 'csrf_attempt',
        severity: 'high',
        details,
        timestamp: new Date(),
      }),
    reportRateLimit: (details: string) =>
      reportSecurityEvent({
        type: 'rate_limit',
        severity: 'medium',
        details,
        timestamp: new Date(),
      }),
    reportInjectionAttempt: (details: string) =>
      reportSecurityEvent({
        type: 'injection_attempt',
        severity: 'high',
        details,
        timestamp: new Date(),
      }),
    reportSuspiciousActivity: (details: string) =>
      reportSecurityEvent({
        type: 'suspicious_activity',
        severity: 'low',
        details,
        timestamp: new Date(),
      }),
  }
}
