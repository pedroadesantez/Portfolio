'use client'

import { motion } from 'framer-motion'
import { Download, MapPin, Calendar, Award, GraduationCap, Briefcase, Star, Users, Code, Coffee, Music, Book } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteData from '@/data/site-data.json'
import { formatDate } from '@/lib/utils'

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: '2+', icon: Briefcase },
    { label: 'Projects Completed', value: `${siteData.projects.length}+`, icon: Code },
    { label: 'Technologies Used', value: '15+', icon: Star },
    { label: 'Coffee Consumed', value: '∞', icon: Coffee },
  ]

  const personalInterests = [
    { name: 'Open Source', description: 'Contributing to community projects', icon: Code },
    { name: 'Music Production', description: 'Creating beats and melodies', icon: Music },
    { name: 'Tech Meetups', description: 'Sharing knowledge with peers', icon: Users },
    { name: 'Reading', description: 'Learning from tech books & blogs', icon: Book },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary-900/10 via-background to-accent-900/10">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-accent-400 font-medium mb-4 block"
                >
                  About Me
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6"
                >
                  Hi, I'm <span className="text-gradient">{siteData.name.split(' ')[0]}</span>
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 text-text-secondary text-lg leading-relaxed mb-8"
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
                    <Download className="w-4 h-4" />
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
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card text-center hover:bg-surface-hover transition-all duration-300 cursor-pointer"
                  >
                    <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Skills & Expertise
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A comprehensive overview of the technologies, frameworks, and tools I use to create exceptional digital experiences.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {Object.entries(siteData.skills).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="card hover:bg-surface-hover transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-6 capitalize flex items-center">
                    {category === 'languages' && <Code className="w-5 h-5 text-primary-400 mr-2" />}
                    {category === 'frameworks' && <Star className="w-5 h-5 text-accent-400 mr-2" />}
                    {category === 'tools' && <Award className="w-5 h-5 text-primary-400 mr-2" />}
                    {category === 'concepts' && <Users className="w-5 h-5 text-accent-400 mr-2" />}
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {(skills as any[]).slice(0, 5).map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                          <span className="text-xs text-text-secondary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-surface-hover rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.1 + index * 0.05,
                              ease: "easeOut"
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
              ))}
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Professional Journey
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                My professional journey and the experiences that have shaped my development skills.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 opacity-30"></div>
                
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
                        className="absolute left-6 top-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-background z-10"
                      />
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="card hover:bg-surface-hover transition-all duration-300"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-text-primary">{exp.title}</h3>
                            <p className="text-primary-400 font-medium">{exp.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-text-secondary mt-2">
                              <span className="px-2 py-1 bg-accent-600/10 text-accent-400 rounded text-xs font-medium">
                                {exp.type}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-text-secondary mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs font-medium bg-surface text-text-secondary rounded border border-glass-border"
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Education
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                My academic foundation in software engineering and computer science.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {siteData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card hover:bg-surface-hover transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="p-3 bg-primary-600/10 rounded-full">
                        <GraduationCap className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{edu.degree}</h3>
                        <p className="text-primary-400 font-medium">{edu.institution}</p>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent-400">{edu.gpa}</div>
                      <div className="text-sm text-text-secondary">GPA</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {edu.achievements.slice(0, 3).map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: achIndex * 0.1 }}
                            className="flex items-center space-x-2 text-text-secondary"
                          >
                            <Star className="w-4 h-4 text-accent-400 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-3">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.slice(0, 6).map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 text-xs font-medium bg-primary-600/10 text-primary-400 rounded-full border border-primary-600/20"
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Beyond Coding
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                When I'm not writing code, you'll find me exploring these passions that fuel my creativity and growth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalInterests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card text-center hover:bg-surface-hover transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-accent-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <interest.icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{interest.name}</h3>
                  <p className="text-sm text-text-secondary">{interest.description}</p>
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
              className="card max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-600/10 to-accent-600/10 border-primary-600/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Users className="w-8 h-8 text-primary-400" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
                Let's Create Something Amazing Together
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative projects and bring creative ideas to life. 
                Whether you have a specific vision or need help exploring possibilities, let's connect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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