import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sanitizeInput, validateEmail } from '@/lib/security'

// Contact form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .transform((val) => sanitizeInput(val, 50)),
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform((val) => sanitizeInput(val, 254))
    .refine(validateEmail, 'Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .transform((val) => sanitizeInput(val, 100)),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .transform((val) => sanitizeInput(val, 1000)),
})

// Rate limiting storage (in production, use Redis or similar)
const submissions = new Map<string, { count: number; lastReset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxAttempts = 3

  const record = submissions.get(ip)
  
  if (!record || now - record.lastReset > windowMs) {
    submissions.set(ip, { count: 1, lastReset: now })
    return false
  }

  if (record.count >= maxAttempts) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous'

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Check if Formspree endpoint is configured
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

    if (formspreeEndpoint) {
      // Send to Formspree
      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }),
      })

      if (!formspreeResponse.ok) {
        throw new Error(`Formspree error: ${formspreeResponse.status}`)
      }

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you within 24 hours.',
      })
    } else {
      // Fallback: Return success but indicate configuration needed
      console.warn('FORMSPREE_ENDPOINT not configured. Contact form submission:', {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message.substring(0, 100) + '...',
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Message received! I\'ll get back to you within 24 hours.',
        fallback: true,
      })
    }
  } catch (error) {
    console.error('Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid form data',
          details: error.errors.map(e => e.message)
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact me directly.' },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}