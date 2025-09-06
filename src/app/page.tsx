'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Briefcase,
  User,
  Code,
  Mail,
  Star,
  Users,
  Award,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import ContactForm from '@/components/ContactForm'
import siteData from '@/data/site-data.json'
import { cn } from '@/lib/utils'

// Lazy load Three.js component for better initial page load
const HeroThree = lazy(() => import('@/components/HeroThree'))

export default function HomePage() {
  const featuredProjects = siteData.projects
    .filter((project) => project.featured)
    .slice(0, 3)
  const topSkills = {
    languages: siteData.skills.languages.slice(0, 4),
    frameworks: siteData.skills.frameworks.slice(0, 4),
    tools: siteData.skills.tools.slice(0, 4),
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-accent-900/20" />
          }
        >
          <HeroThree className="absolute inset-0 h-full w-full" />
        </Suspense>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto max-w-4xl"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 font-medium tracking-wide text-accent-400"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 font-display text-5xl font-bold text-text-primary md:text-7xl"
            >
              <span className="text-gradient">{siteData.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 text-xl font-medium text-text-secondary md:text-2xl"
            >
              {siteData.role}
            </motion.h2>

            {/* Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
            >
              {siteData.headline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="btn-primary group flex items-center space-x-2"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href={siteData.settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mx-auto mt-16 grid max-w-md grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-gradient text-2xl font-bold">4+</div>
                <div className="text-sm text-text-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-gradient text-2xl font-bold">2+</div>
                <div className="text-sm text-text-secondary">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-gradient text-2xl font-bold">100%</div>
                <div className="text-sm text-text-secondary">
                  Client Satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-text-secondary/30"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-2 h-3 w-1 rounded-full bg-text-secondary/50"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
              About Me
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Get to know more about my background, skills, and passion for
              creating digital experiences.
            </p>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-text-secondary">
                {siteData.bio.split('\n\n')[0]}
              </p>
              <p className="leading-relaxed text-text-secondary">
                {siteData.bio.split('\n\n')[1]}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="btn-primary flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>More About Me</span>
                </Link>
                <Link
                  href="/projects"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>View Projects</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Achievement Cards */}
              <div className="card text-center">
                <Award className="mx-auto mb-3 h-8 w-8 text-primary-400" />
                <h3 className="mb-2 font-semibold text-text-primary">
                  Education
                </h3>
                <p className="text-sm text-text-secondary">
                  BSc Computer Science
                </p>
                <p className="text-sm text-text-secondary">
                  {siteData.education[0].institution}
                </p>
              </div>

              <div className="card text-center">
                <Users className="mx-auto mb-3 h-8 w-8 text-accent-400" />
                <h3 className="mb-2 font-semibold text-text-primary">
                  Experience
                </h3>
                <p className="text-sm text-text-secondary">
                  Full-stack Development
                </p>
                <p className="text-sm text-text-secondary">2+ Years</p>
              </div>

              <div className="card text-center">
                <Star className="mx-auto mb-3 h-8 w-8 text-primary-400" />
                <h3 className="mb-2 font-semibold text-text-primary">
                  Specialization
                </h3>
                <p className="text-sm text-text-secondary">React & Next.js</p>
                <p className="text-sm text-text-secondary">Modern Web Apps</p>
              </div>

              <div className="card text-center">
                <Code className="mx-auto mb-3 h-8 w-8 text-accent-400" />
                <h3 className="mb-2 font-semibold text-text-primary">Focus</h3>
                <p className="text-sm text-text-secondary">Performance & UX</p>
                <p className="text-sm text-text-secondary">Accessibility</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section bg-surface/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
              Skills & Technologies
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Here are the technologies and tools I work with to bring ideas to
              life.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="mb-6 flex items-center text-xl font-semibold text-text-primary">
                <Code className="mr-2 h-5 w-5 text-primary-400" />
                Languages
              </h3>
              <div className="space-y-4">
                {topSkills.languages.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="skill-item"
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-hover">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="mb-6 flex items-center text-xl font-semibold text-text-primary">
                <Briefcase className="mr-2 h-5 w-5 text-accent-400" />
                Frameworks
              </h3>
              <div className="space-y-4">
                {topSkills.frameworks.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="skill-item"
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-hover">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="mb-6 flex items-center text-xl font-semibold text-text-primary">
                <User className="mr-2 h-5 w-5 text-primary-400" />
                Tools
              </h3>
              <div className="space-y-4">
                {topSkills.tools.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="skill-item"
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-hover">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/about" className="btn-secondary">
              View All Skills
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              A showcase of my recent work, demonstrating my skills in modern
              web development and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="btn-primary mx-auto flex w-fit items-center space-x-2"
            >
              <Briefcase className="h-4 w-4" />
              <span>View All Projects</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-surface/30" id="contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
              Let's Create Something Amazing
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Ready to bring your ideas to life? I'm always excited to work on
              new projects and collaborate with innovative teams.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
