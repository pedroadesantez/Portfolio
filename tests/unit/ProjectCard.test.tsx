import { render, screen } from '@testing-library/react'
import { jest } from '@jest/globals'
import ProjectCard from '@/components/ProjectCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}))

// Mock Next.js components
jest.mock('next/image', () => {
  return ({ alt, ...props }: any) => <img alt={alt} {...props} />
})

jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description that showcases modern web development.',
  stack: ['React', 'TypeScript', 'Next.js'],
  image: '/assets/test-project.jpg',
  github: 'https://github.com/test/test-project',
  live: 'https://test-project.vercel.app',
  featured: true,
  category: 'Web App',
}

describe('ProjectCard Component', () => {
  test('renders project information correctly', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Check if project title is rendered
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    
    // Check if description is rendered
    expect(screen.getByText(/This is a test project description/)).toBeInTheDocument()
    
    // Check if category is rendered
    expect(screen.getByText('Web App')).toBeInTheDocument()
  })

  test('renders tech stack tags', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Check if all tech stack items are rendered
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  test('displays featured badge when featured is true', () => {
    render(<ProjectCard {...mockProject} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  test('does not display featured badge when featured is false', () => {
    render(<ProjectCard {...mockProject} featured={false} />)
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  test('renders project links correctly', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Check GitHub link
    const githubLinks = screen.getAllByLabelText(/View Test Project source code on GitHub/)
    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/test/test-project')
    expect(githubLinks[0]).toHaveAttribute('target', '_blank')
    
    // Check live demo link
    const liveLinks = screen.getAllByLabelText(/View Test Project live demo/)
    expect(liveLinks[0]).toHaveAttribute('href', 'https://test-project.vercel.app')
    expect(liveLinks[0]).toHaveAttribute('target', '_blank')
  })

  test('does not render live demo link when live is null', () => {
    render(<ProjectCard {...mockProject} live={null} />)
    
    // Live demo links should not be present
    expect(screen.queryByLabelText(/View Test Project live demo/)).not.toBeInTheDocument()
  })

  test('renders project image with correct alt text', () => {
    render(<ProjectCard {...mockProject} />)
    
    const image = screen.getByAltText('Test Project project screenshot')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/assets/test-project.jpg')
  })

  test('limits displayed tech stack to 4 items', () => {
    const projectWithManyTechs = {
      ...mockProject,
      stack: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Three.js'],
    }
    
    render(<ProjectCard {...projectWithManyTechs} />)
    
    // Should show first 4 technologies
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
    
    // Should show "+2 more" indicator
    expect(screen.getByText('+2 more')).toBeInTheDocument()
    
    // Should not show the additional technologies
    expect(screen.queryByText('Framer Motion')).not.toBeInTheDocument()
    expect(screen.queryByText('Three.js')).not.toBeInTheDocument()
  })

  test('has proper link to project detail page', () => {
    render(<ProjectCard {...mockProject} />)
    
    const detailLink = screen.getByRole('link', { name: 'Test Project' })
    expect(detailLink).toHaveAttribute('href', '/projects/test-project')
  })

  test('has learn more link', () => {
    render(<ProjectCard {...mockProject} />)
    
    const learnMoreLink = screen.getByText('Learn more →')
    expect(learnMoreLink).toBeInTheDocument()
    expect(learnMoreLink.closest('a')).toHaveAttribute('href', '/projects/test-project')
  })
})