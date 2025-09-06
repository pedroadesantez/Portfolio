import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import ContactForm from '@/components/ContactForm'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form fields correctly', () => {
    render(<ContactForm />)
    
    // Check if form title is present
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument()
    
    // Check if all form fields are present
    expect(screen.getByLabelText('Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject *')).toBeInTheDocument()
    expect(screen.getByLabelText('Message *')).toBeInTheDocument()
    
    // Check if submit button is present
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Try to submit without filling fields
    await user.click(submitButton)
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText('Email *')
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Enter invalid email
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  test('shows character count for message field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText('Message *')
    
    // Initially should show 0/1000
    expect(screen.getByText('0/1000')).toBeInTheDocument()
    
    // Type some text
    await user.type(messageInput, 'Hello world!')
    
    // Should update character count
    expect(screen.getByText('12/1000')).toBeInTheDocument()
  })

  test('submit button is disabled when form is invalid', () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    expect(submitButton).toBeDisabled()
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>
    
    // Mock successful response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response)
    
    render(<ContactForm />)
    
    // Fill out form with valid data
    await user.type(screen.getByLabelText('Name *'), 'John Doe')
    await user.type(screen.getByLabelText('Email *'), 'john@example.com')
    await user.type(screen.getByLabelText('Subject *'), 'Test Subject')
    await user.type(screen.getByLabelText('Message *'), 'This is a test message with enough characters.')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    expect(submitButton).not.toBeDisabled()
    
    // Submit form
    await user.click(submitButton)
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
    })
  })

  test('handles form submission error', async () => {
    const user = userEvent.setup()
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>
    
    // Mock failed response
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    // Fill out form with valid data
    await user.type(screen.getByLabelText('Name *'), 'John Doe')
    await user.type(screen.getByLabelText('Email *'), 'john@example.com')
    await user.type(screen.getByLabelText('Subject *'), 'Test Subject')
    await user.type(screen.getByLabelText('Message *'), 'This is a test message with enough characters.')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Submit form
    await user.click(submitButton)
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/)).toBeInTheDocument()
    })
  })

  test('displays alternative contact email', () => {
    render(<ContactForm />)
    
    // Check if alternative contact email is displayed
    expect(screen.getByText('alex.mwangi@example.com')).toBeInTheDocument()
  })

  test('form has proper accessibility attributes', () => {
    render(<ContactForm />)
    
    // Check if form fields have proper labels and aria attributes
    const nameInput = screen.getByLabelText('Name *')
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(nameInput).toHaveAttribute('type', 'text')
    
    const emailInput = screen.getByLabelText('Email *')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(emailInput).toHaveAttribute('type', 'email')
    
    const subjectInput = screen.getByLabelText('Subject *')
    expect(subjectInput).toHaveAttribute('id', 'subject')
    
    const messageInput = screen.getByLabelText('Message *')
    expect(messageInput).toHaveAttribute('id', 'message')
  })
})