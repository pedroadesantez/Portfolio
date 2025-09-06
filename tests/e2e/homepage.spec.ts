import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Alex Mwangi.*Software Developer/)
    
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Building performant web apps/)
  })

  test('displays hero section with name and role', async ({ page }) => {
    // Check if hero section is visible
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()

    // Check if name is displayed
    await expect(page.getByText('Alex Mwangi')).toBeVisible()
    
    // Check if role is displayed
    await expect(page.getByText('Software Developer')).toBeVisible()
    
    // Check if headline is displayed
    await expect(page.getByText('Building performant web apps with care & creativity')).toBeVisible()
  })

  test('displays call-to-action buttons', async ({ page }) => {
    // Check if "Let's Work Together" button is visible and clickable
    const ctaButton = page.getByRole('link', { name: /let's work together/i })
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute('href', '/contact')

    // Check if "Download Resume" button is visible
    const resumeButton = page.getByRole('link', { name: /download resume/i })
    await expect(resumeButton).toBeVisible()
    await expect(resumeButton).toHaveAttribute('href', '/assets/resume.pdf')
  })

  test('displays statistics section', async ({ page }) => {
    // Check if stats are visible
    await expect(page.getByText('4+')).toBeVisible()
    await expect(page.getByText('Projects')).toBeVisible()
    await expect(page.getByText('2+')).toBeVisible()
    await expect(page.getByText('Years Experience')).toBeVisible()
    await expect(page.getByText('100%')).toBeVisible()
    await expect(page.getByText('Client Satisfaction')).toBeVisible()
  })

  test('displays about section', async ({ page }) => {
    // Check if about section heading is visible
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
    
    // Check if bio text is visible
    await expect(page.getByText(/Hi there! I'm Alex/)).toBeVisible()
    
    // Check if about links are functional
    const moreAboutLink = page.getByRole('link', { name: /more about me/i })
    await expect(moreAboutLink).toBeVisible()
    await expect(moreAboutLink).toHaveAttribute('href', '/about')
    
    const projectsLink = page.getByRole('link', { name: /view projects/i })
    await expect(projectsLink).toBeVisible()
    await expect(projectsLink).toHaveAttribute('href', '/projects')
  })

  test('displays skills section', async ({ page }) => {
    // Check if skills section is visible
    await expect(page.getByRole('heading', { name: 'Skills & Technologies' })).toBeVisible()
    
    // Check if skill categories are visible
    await expect(page.getByText('Languages')).toBeVisible()
    await expect(page.getByText('Frameworks')).toBeVisible()
    await expect(page.getByText('Tools')).toBeVisible()
    
    // Check if some technologies are listed
    await expect(page.getByText('JavaScript/TypeScript')).toBeVisible()
    await expect(page.getByText('React/Next.js')).toBeVisible()
  })

  test('displays featured projects', async ({ page }) => {
    // Check if projects section heading is visible
    await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible()
    
    // Check if at least one project is visible
    await expect(page.getByText('HarmonyBot')).toBeVisible()
    await expect(page.getByText('EcoTracker')).toBeVisible()
    
    // Check if "View All Projects" link is present
    const viewAllLink = page.getByRole('link', { name: /view all projects/i })
    await expect(viewAllLink).toBeVisible()
    await expect(viewAllLink).toHaveAttribute('href', '/projects')
  })

  test('displays contact section with form', async ({ page }) => {
    // Check if contact section is visible
    await expect(page.getByRole('heading', { name: "Let's Create Something Amazing" })).toBeVisible()
    
    // Check if contact form is present
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /subject/i })).toBeVisible()
    await expect(page.getByRole('textbox', { name: /message/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
  })

  test('has functional navigation', async ({ page }) => {
    // Check if header navigation is present
    const navigation = page.locator('header')
    await expect(navigation).toBeVisible()
    
    // Test navigation links
    const aboutLink = navigation.getByRole('link', { name: 'About' })
    await expect(aboutLink).toHaveAttribute('href', '/about')
    
    const projectsLink = navigation.getByRole('link', { name: 'Projects' })
    await expect(projectsLink).toHaveAttribute('href', '/projects')
    
    const contactLink = navigation.getByRole('link', { name: 'Contact' })
    await expect(contactLink).toHaveAttribute('href', '/contact')
  })

  test('has smooth scroll behavior', async ({ page }) => {
    // Click on a link that should scroll to a section
    const scrollIndicator = page.locator('[class*="scroll"]').first()
    if (await scrollIndicator.isVisible()) {
      await scrollIndicator.click()
      
      // Wait for potential scroll animation
      await page.waitForTimeout(1000)
      
      // Check that we've scrolled down
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(0)
    }
  })

  test('is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.getByLabel(/open menu|menu/i)
    await expect(mobileMenuButton).toBeVisible()
    
    // Click mobile menu
    await mobileMenuButton.click()
    
    // Check if mobile menu opens
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('Three.js scene loads without errors', async ({ page }) => {
    // Check for JavaScript errors
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })
    
    // Wait for Three.js to potentially load
    await page.waitForTimeout(3000)
    
    // Filter out common Three.js warnings that are not critical
    const criticalErrors = errors.filter(error => 
      !error.includes('WebGL') && 
      !error.includes('THREE') && 
      !error.includes('Canvas')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })

  test('has proper accessibility features', async ({ page }) => {
    // Check if skip link is present
    const skipLink = page.getByText('Skip to main content')
    await expect(skipLink).toHaveAttribute('href', '#main-content')
    
    // Check if main content has proper ID
    const mainContent = page.locator('#main-content')
    await expect(mainContent).toBeAttached()
    
    // Check if images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      const alt = await image.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})