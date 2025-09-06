'use client'

import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Briefcase, User, Code, Mail, Star, Users, Award } from 'lucide-react'
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
  const featuredProjects = siteData.projects.filter(project => project.featured).slice(0, 3)
  const topSkills = {
    languages: siteData.skills.languages.slice(0, 4),
    frameworks: siteData.skills.frameworks.slice(0, 4),
    tools: siteData.skills.tools.slice(0, 4),
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <Suspense fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-accent-900/20" />
        }>
          <HeroThree className="absolute inset-0 w-full h-full" />
        </Suspense>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto"
          >
            {/* Greeting */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent-400 font-medium mb-4 tracking-wide"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-6"
            >
              <span className="text-gradient">{siteData.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-text-secondary mb-8 font-medium"
            >
              {siteData.role}
            </motion.h2>

            {/* Headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {siteData.headline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/contact"
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              
              <a
                href={siteData.settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">4+</div>
                <div className="text-sm text-text-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">2+</div>
                <div className="text-sm text-text-secondary">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">100%</div>
                <div className="text-sm text-text-secondary">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-text-secondary/50 rounded-full mt-2"
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              About Me
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Get to know more about my background, skills, and passion for creating digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-text-secondary leading-relaxed">
                {siteData.bio.split('\n\n')[0]}
              </p>
              <p className="text-text-secondary leading-relaxed">
                {siteData.bio.split('\n\n')[1]}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/about" className="btn-primary flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>More About Me</span>
                </Link>
                <Link href="/projects" className="btn-secondary flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
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
                <Award className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Education</h3>
                <p className="text-sm text-text-secondary">BSc Computer Science</p>
                <p className="text-sm text-text-secondary">{siteData.education[0].institution}</p>
              </div>
              
              <div className="card text-center">
                <Users className="w-8 h-8 text-accent-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Experience</h3>
                <p className="text-sm text-text-secondary">Full-stack Development</p>
                <p className="text-sm text-text-secondary">2+ Years</p>
              </div>
              
              <div className="card text-center">
                <Star className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Specialization</h3>
                <p className="text-sm text-text-secondary">React & Next.js</p>
                <p className="text-sm text-text-secondary">Modern Web Apps</p>
              </div>
              
              <div className="card text-center">
                <Code className="w-8 h-8 text-accent-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Focus</h3>
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Skills & Technologies
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Code className="w-5 h-5 text-primary-400 mr-2" />
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
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-text-primary">{skill.name}</span>
                      <span className="text-xs text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-surface-hover rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full"
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
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Briefcase className="w-5 h-5 text-accent-400 mr-2" />
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
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-text-primary">{skill.name}</span>
                      <span className="text-xs text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-surface-hover rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-accent-500 to-accent-400 h-2 rounded-full"
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
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <User className="w-5 h-5 text-primary-400 mr-2" />
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
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-text-primary">{skill.name}</span>
                      <span className="text-xs text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-surface-hover rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
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
            className="text-center mt-12"
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A showcase of my recent work, demonstrating my skills in modern web development and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            className="text-center mt-12"
          >
            <Link href="/projects" className="btn-primary flex items-center space-x-2 mx-auto w-fit">
              <Briefcase className="w-4 h-4" />
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Let's Create Something Amazing
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with innovative teams.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  )
}