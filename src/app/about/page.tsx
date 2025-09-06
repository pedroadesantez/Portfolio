'use client'

import { motion } from 'framer-motion'
import {
  Download,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  Star,
  Users,
  Code,
  Coffee,
  Music,
  Book,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteData from '@/data/site-data.json'
import { formatDate } from '@/lib/utils'

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: '2+', icon: Briefcase },
    {
      label: 'Projects Completed',
      value: `${siteData.projects.length}+`,
      icon: Code,
    },
    { label: 'Technologies Used', value: '15+', icon: Star },
    { label: 'Coffee Consumed', value: '∞', icon: Coffee },
  ]

  const personalInterests = [
    {
      name: 'Open Source',
      description: 'Contributing to community projects',
      icon: Code,
    },
    {
      name: 'Music Production',
      description: 'Creating beats and melodies',
      icon: Music,
    },
    {
      name: 'Tech Meetups',
      description: 'Sharing knowledge with peers',
      icon: Users,
    },
    {
      name: 'Reading',
      description: 'Learning from tech books & blogs',
      icon: Book,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary-900/10 via-background to-accent-900/10">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 block font-medium text-accent-400"
                >
                  About Me
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 font-display text-4xl font-bold text-text-primary md:text-5xl"
                >
                  Hi, I'm{' '}
                  <span className="text-gradient">
                    {siteData.name.split(' ')[0]}
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 space-y-4 text-lg leading-relaxed text-text-secondary"
                >
                  {siteData.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href={siteData.settings.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Resume</span>
                  </a>
                  <Link href="/contact" className="btn-secondary">
                    Let's Connect
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card cursor-pointer text-center transition-all duration-300 hover:bg-surface-hover"
                  >
                    <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary-400" />
                    <h3 className="mb-1 text-2xl font-bold text-text-primary">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Skills & Expertise
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                A comprehensive overview of the technologies, frameworks, and
                tools I use to create exceptional digital experiences.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
              {Object.entries(siteData.skills).map(
                ([category, skills], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="card transition-colors duration-300 hover:bg-surface-hover"
                  >
                    <h3 className="mb-6 flex items-center text-xl font-semibold capitalize text-text-primary">
                      {category === 'languages' && (
                        <Code className="mr-2 h-5 w-5 text-primary-400" />
                      )}
                      {category === 'frameworks' && (
                        <Star className="mr-2 h-5 w-5 text-accent-400" />
                      )}
                      {category === 'tools' && (
                        <Award className="mr-2 h-5 w-5 text-primary-400" />
                      )}
                      {category === 'concepts' && (
                        <Users className="mr-2 h-5 w-5 text-accent-400" />
                      )}
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {(
                        skills as {
                          name: string
                          level: number
                          years: number
                        }[]
                      )
                        .slice(0, 5)
                        .map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: categoryIndex * 0.1 + index * 0.05,
                            }}
                          >
                            <div className="mb-2 flex justify-between">
                              <span className="text-sm font-medium text-text-primary">
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
                                transition={{
                                  duration: 1.5,
                                  delay: categoryIndex * 0.1 + index * 0.05,
                                  ease: 'easeOut',
                                }}
                                className={`h-2 rounded-full ${
                                  category === 'languages'
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-400'
                                    : category === 'frameworks'
                                      ? 'bg-gradient-to-r from-accent-500 to-accent-400'
                                      : category === 'tools'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                                        : 'bg-gradient-to-r from-accent-500 to-primary-500'
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="section bg-surface/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Professional Journey
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                My professional journey and the experiences that have shaped my
                development skills.
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 opacity-30"></div>

                <div className="space-y-8">
                  {siteData.experience.slice(0, 3).map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-20"
                    >
                      {/* Timeline marker */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="absolute left-6 top-6 z-10 h-4 w-4 rounded-full border-4 border-background bg-primary-600"
                      />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="card transition-all duration-300 hover:bg-surface-hover"
                      >
                        <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-text-primary">
                              {exp.title}
                            </h3>
                            <p className="font-medium text-primary-400">
                              {exp.company}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
                              <span className="rounded bg-accent-600/10 px-2 py-1 text-xs font-medium text-accent-400">
                                {exp.type}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {formatDate(exp.startDate)} -{' '}
                                  {exp.current
                                    ? 'Present'
                                    : formatDate(exp.endDate!)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mb-4 text-text-secondary">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-glass-border bg-surface px-2 py-1 text-xs font-medium text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Education
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                My academic foundation in software engineering and computer
                science.
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              {siteData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card transition-all duration-300 hover:bg-surface-hover"
                >
                  <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 flex items-start space-x-4 lg:mb-0">
                      <div className="rounded-full bg-primary-600/10 p-3">
                        <GraduationCap className="h-6 w-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">
                          {edu.degree}
                        </h3>
                        <p className="font-medium text-primary-400">
                          {edu.institution}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(edu.startDate)} -{' '}
                              {formatDate(edu.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent-400">
                        {edu.gpa}
                      </div>
                      <div className="text-sm text-text-secondary">GPA</div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-lg font-semibold text-text-primary">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements
                          .slice(0, 3)
                          .map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: achIndex * 0.1 }}
                              className="flex items-center space-x-2 text-text-secondary"
                            >
                              <Star className="h-4 w-4 flex-shrink-0 text-accent-400" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3 text-lg font-semibold text-text-primary">
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.slice(0, 6).map((course) => (
                          <span
                            key={course}
                            className="rounded-full border border-primary-600/20 bg-primary-600/10 px-3 py-1 text-xs font-medium text-primary-400"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="section bg-surface/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Beyond Coding
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                When I'm not writing code, you'll find me exploring these
                passions that fuel my creativity and growth.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {personalInterests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card cursor-pointer text-center transition-all duration-300 hover:bg-surface-hover"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-600/10">
                    <interest.icon className="h-6 w-6 text-accent-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {interest.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card mx-auto max-w-4xl border-primary-600/20 bg-gradient-to-r from-primary-600/10 to-accent-600/10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/20"
              >
                <Users className="h-8 w-8 text-primary-400" />
              </motion.div>
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary">
                Let's Create Something Amazing Together
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
                I'm always excited to collaborate on innovative projects and
                bring creative ideas to life. Whether you have a specific vision
                or need help exploring possibilities, let's connect!
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Start a Conversation
                </Link>
                <Link href="/projects" className="btn-secondary">
                  View My Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
