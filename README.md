# Portfolio Website

A modern, responsive portfolio website for a software developer built with Next.js, TypeScript, Tailwind CSS, and Three.js. Features an interactive 3D hero section, smooth animations, and comprehensive accessibility support.

![Portfolio Screenshot](./public/assets/og-image.jpg)

## 🚀 Features

- **🎨 Modern Design**: Futuristic glassmorphism UI with neon accents
- **🎭 Interactive 3D Hero**: Three.js particle wave animation with mouse interaction
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **♿ Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **⚡ High Performance**: Lighthouse scores ≥90 performance, ≥95 accessibility
- **🔍 SEO Optimized**: Meta tags, structured data, and sitemap
- **✨ Smooth Animations**: Framer Motion powered micro-interactions
- **📧 Contact Form**: React Hook Form with validation and Formspree integration
- **🧪 Comprehensive Testing**: Unit tests with Jest and E2E tests with Playwright
- **🚀 CI/CD Ready**: GitHub Actions workflow for automated testing and deployment

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **React 18** - Latest React features

### Styling & Animation

- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics and interactive hero section

### Forms & Validation

- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Formspree** - Form backend service (configurable)

### Testing

- **Jest** - Unit testing framework
- **React Testing Library** - Testing utilities for React
- **Playwright** - End-to-end testing

### Development Tools

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Lighthouse CI** - Performance monitoring

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dev-Ps-peter/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)

   ```bash
   cp .env.example .env.local
   ```

   Update the following variables:
   - `FORMSPREE_ENDPOINT` - Your Formspree form endpoint
   - `NEXT_PUBLIC_SITE_URL` - Your site URL for production

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # Run TypeScript type checking
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing

```bash
npm run test         # Run unit tests
npm run test:watch   # Run unit tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

## 📁 Project Structure

```
portfolio-website/
├── public/                 # Static assets
│   ├── assets/            # Images, resume, etc.
│   ├── robots.txt         # Search engine directives
│   └── sitemap.xml        # Site structure for SEO
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── projects/      # Projects pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Footer.tsx     # Site footer
│   │   ├── HeroThree.tsx  # 3D hero section
│   │   ├── ProjectCard.tsx # Project display card
│   │   └── ContactForm.tsx # Contact form
│   ├── data/              # Site content and configuration
│   │   └── site-data.json # Centralized site data
│   ├── lib/               # Utility functions
│   │   └── utils.ts       # Helper functions
│   └── styles/            # Global styles
│       └── globals.css    # Tailwind and global CSS
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   └── e2e/              # End-to-end tests
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
└── config files          # Various configuration files
```

## 🎨 Customization

### 1. Update Site Data

Edit `src/data/site-data.json` to customize:

- Personal information (name, bio, contact details)
- Projects and portfolio items
- Skills and experience
- Education and certifications
- Social media links

### 2. Styling & Theme

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Typography**: Update fonts in `src/app/layout.tsx`
- **Animations**: Customize animations in component files
- **Three.js Scene**: Modify the hero scene in `src/components/HeroThree.tsx`

### 3. Content Management

- **Projects**: Add project images to `public/assets/`
- **Resume**: Replace `public/assets/resume.pdf` with your resume
- **Images**: Update profile and project images
- **Metadata**: Update SEO data in layout files

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build          # Build the application
npm run start          # Start production server
```

### Environment Variables for Production

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 📊 Performance & Lighthouse Scores

Target scores for optimal performance:

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Performance Optimization Features

- Image optimization with Next.js Image component
- Lazy loading for Three.js components
- Code splitting and tree shaking
- Reduced motion support for accessibility
- Optimized bundle size

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**: Meets modern accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences
- **Color Contrast**: High contrast ratios for text and UI elements

## 🧪 Testing Strategy

### Unit Tests

- Component rendering and behavior
- Form validation logic
- Utility functions
- Accessibility features

### End-to-End Tests

- User interactions and workflows
- Navigation and routing
- Form submissions
- Responsive design
- Performance metrics

### Continuous Integration

- Automated testing on pull requests
- Lighthouse performance audits
- Security vulnerability scanning
- Code quality checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Three.js](https://threejs.org/) - 3D graphics library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

Peter Njuguna - [pedroadesantez@gmail.com](mailto:pedroadesantez@gmail.com)

Project Link: [https://github.com/Dev-Ps-peter/portfolio](https://github.com/Dev-Ps-peter/portfolio)

---

**Built with ❤️ using modern web technologies**
