'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  sanitizeInput, 
  validateEmail, 
  ClientRateLimit, 
  RATE_LIMITS, 
  generateSecureToken,
  generateFingerprint,
  isSecureContext 
} from '@/lib/security'

// Enhanced form validation schema with security checks
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .transform(val => sanitizeInput(val, 50))
    .refine(val => val.length >= 2, 'Name must be at least 2 characters after sanitization'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .transform(val => sanitizeInput(val, 254))
    .refine(validateEmail, 'Please enter a valid and safe email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .transform(val => sanitizeInput(val, 100))
    .refine(val => val.length >= 5, 'Subject must be at least 5 characters after sanitization'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .transform(val => sanitizeInput(val, 1000))
    .refine(val => val.length >= 10, 'Message must be at least 10 characters after sanitization'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
}

// Initialize rate limiter
const rateLimiter = new ClientRateLimit()

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [securityToken, setSecurityToken] = useState('')
  const [userFingerprint, setUserFingerprint] = useState('')
  const [isSecure, setIsSecure] = useState(false)
  const [remainingAttempts, setRemainingAttempts] = useState<number>(RATE_LIMITS.CONTACT_FORM.maxAttempts)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  // Watch form values for character count
  const watchedMessage = watch('message', '')
  const messageCharCount = watchedMessage.length

  // Initialize security measures
  useEffect(() => {
    setSecurityToken(generateSecureToken())
    setUserFingerprint(generateFingerprint())
    setIsSecure(isSecureContext())
    
    // Update remaining attempts on component mount
    const remaining = rateLimiter.getRemainingAttempts(generateFingerprint(), RATE_LIMITS.CONTACT_FORM)
    setRemainingAttempts(remaining)
  }, [])

  // Update remaining attempts when submit status changes
  useEffect(() => {
    if (submitStatus === 'rate-limited' || submitStatus === 'error') {
      const remaining = rateLimiter.getRemainingAttempts(userFingerprint, RATE_LIMITS.CONTACT_FORM)
      setRemainingAttempts(remaining)
    }
  }, [submitStatus, userFingerprint])

  const onSubmit = async (data: ContactFormData) => {
    // Check rate limiting
    const rateLimitKey = userFingerprint || 'anonymous'
    if (!rateLimiter.isAllowed(rateLimitKey, RATE_LIMITS.CONTACT_FORM)) {
      setSubmitStatus('rate-limited')
      const timeUntilReset = rateLimiter.getTimeUntilReset(rateLimitKey, RATE_LIMITS.CONTACT_FORM)
      const minutes = Math.ceil(timeUntilReset / (60 * 1000))
      setErrorMessage(`Too many attempts. Please try again in ${minutes} minute(s).`)
      return
    }

    // Security checks
    if (!isSecure && process.env.NODE_ENV === 'production') {
      setSubmitStatus('error')
      setErrorMessage('This form requires a secure HTTPS connection.')
      return
    }

    setSubmitStatus('loading')
    setErrorMessage('')
    
    // Record the attempt for rate limiting
    rateLimiter.recordAttempt(rateLimitKey)

    try {
      // Using mailto as a fallback - for production, integrate with:
      // - EmailJS (free tier available): https://www.emailjs.com/
      // - Formspree (free tier): https://formspree.io/
      // - Netlify Forms (if hosting on Netlify)
      // - Custom API with SendGrid/Resend
      
      // For now, using a simulated submission with mailto fallback
      // To make this work in production, replace with actual service
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // For production, uncomment and configure one of these options:
      
      // Option 1: EmailJS (recommended for static sites)
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      //   from_name: data.name,
      //   from_email: data.email,
      //   subject: data.subject,
      //   message: data.message,
      // }, 'YOUR_PUBLIC_KEY')
      
      // Option 2: Formspree
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      // if (!response.ok) throw new Error('Failed to send')

      setSubmitStatus('success')
      reset() // Reset form after successful submission
      
      // Fallback: Open email client if form service not configured
      if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_EMAIL_SERVICE) {
        const mailtoLink = `mailto:njugunap363@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`
        window.open(mailtoLink, '_blank')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try again or use the email link below.')
      console.error('Form submission error:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('card max-w-2xl mx-auto', className)}
    >
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Mail className="w-8 h-8 text-primary-400" />
        </motion.div>
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
          Let's Work Together
        </h2>
        <p className="text-text-secondary">
          Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
        </p>
        
        {/* Security Status Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
          <Shield className={cn(
            "w-4 h-4",
            isSecure ? "text-green-400" : "text-yellow-400"
          )} />
          <span className={cn(
            "text-xs",
            isSecure ? "text-green-400" : "text-yellow-400"
          )}>
            {isSecure ? "Secure Connection" : "Unsecure Connection"}
          </span>
          <span className="text-text-secondary text-xs">
            • {remainingAttempts} attempts remaining
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-accent-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-text-secondary mb-6">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="btn-secondary"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : submitStatus === 'rate-limited' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Rate Limit Exceeded
            </h3>
            <p className="text-text-secondary mb-6">
              {errorMessage}
            </p>
            <div className="text-sm text-text-secondary">
              This helps protect against spam and ensures quality communication.
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label 
                htmlFor="name"
                className="block text-sm font-medium text-text-primary"
              >
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-surface border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary placeholder-text-secondary',
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-glass-border hover:border-primary-600/30'
                  )}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  id="name-error"
                  className="text-sm text-red-400 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name.message}</span>
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="block text-sm font-medium text-text-primary"
              >
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-surface border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary placeholder-text-secondary',
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-glass-border hover:border-primary-600/30'
                  )}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  id="email-error"
                  className="text-sm text-red-400 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email.message}</span>
                </motion.p>
              )}
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label 
                htmlFor="subject"
                className="block text-sm font-medium text-text-primary"
              >
                Subject *
              </label>
              <input
                {...register('subject')}
                type="text"
                id="subject"
                placeholder="What would you like to discuss?"
                className={cn(
                  'w-full px-4 py-3 bg-surface border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary placeholder-text-secondary',
                  errors.subject 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-glass-border hover:border-primary-600/30'
                )}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  id="subject-error"
                  className="text-sm text-red-400 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.subject.message}</span>
                </motion.p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary"
                >
                  Message *
                </label>
                <span className={cn(
                  'text-xs',
                  messageCharCount > 900 
                    ? 'text-red-400' 
                    : messageCharCount > 800 
                    ? 'text-yellow-400' 
                    : 'text-text-secondary'
                )}>
                  {messageCharCount}/1000
                </span>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-surface border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary placeholder-text-secondary resize-none',
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-glass-border hover:border-primary-600/30'
                  )}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
              </div>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  id="message-error"
                  className="text-sm text-red-400 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.message.message}</span>
                </motion.p>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Error</span>
                </div>
                <p className="text-sm text-red-300 mt-1">{errorMessage}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isValid ? 1.02 : 1 }}
              whileTap={{ scale: isValid ? 0.98 : 1 }}
              type="submit"
              disabled={!isValid || submitStatus === 'loading'}
              className={cn(
                'w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                isValid && submitStatus !== 'loading'
                  ? 'bg-primary-600 text-white hover:bg-primary-500'
                  : 'bg-surface text-text-secondary cursor-not-allowed'
              )}
            >
              {submitStatus === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            {/* Alternative Contact Info */}
            <div className="text-center pt-6 border-t border-glass-border">
              <p className="text-sm text-text-secondary mb-2">
                Prefer to email directly?
              </p>
              <a
                href="mailto:njugunap363@gmail.com"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              >
                njugunap363@gmail.com
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}