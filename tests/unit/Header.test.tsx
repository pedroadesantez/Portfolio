import { render, screen, fireEvent } from '@testing-library/react'
import { jest } from '@jest/globals'
import Header from '@/components/Header'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

// Mock site data
jest.mock('@/data/site-data.json', () => ({
  name: 'Peter Njuguna',
  settings: {
    resumeUrl: '/assets/resume.pdf',
  },
  contact: {
    github: 'https://github.com/ps-Dev',
    linkedin: 'https://linkedin.com/in/peternjuguna',
  },
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  test('renders header with navigation links', () => {
    render(<Header />)

    // Check if logo/name is present
    expect(screen.getByText('Peter Njuguna')).toBeInTheDocument()

    // Check if navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()

    // Check if resume button is present
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  test('toggles mobile menu when menu button is clicked', () => {
    render(<Header />)

    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()

    fireEvent.click(menuButton)

    // After clicking, the aria-expanded should be true
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('has proper accessibility attributes', () => {
    render(<Header />)

    // Check if navigation is properly labeled
    const nav = screen.getByRole('banner')
    expect(nav).toBeInTheDocument()

    // Check if links have proper accessibility
    const homeLinks = screen.getAllByRole('link', { name: /home/i })
    expect(homeLinks[0]).toHaveAttribute('href', '/')

    // Check if resume link opens in new tab
    const resumeLink = screen.getByRole('link', { name: /resume/i })
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('mobile menu contains all navigation items', () => {
    render(<Header />)

    // Click mobile menu button
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)

    // Check if all navigation items are present in mobile menu
    const mobileNavItems = screen.getAllByRole('link')
    expect(mobileNavItems.length).toBeGreaterThan(4) // Main nav + mobile menu items
  })

  test('logo links to home page', () => {
    render(<Header />)

    const logoLink = screen.getByRole('link', { name: 'Home' })
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
