'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import siteData from '@/data/site-data.json'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      details: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
      description: 'Send me an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: siteData.contact.phone,
      href: `tel:${siteData.contact.phone}`,
      description: 'Call or text for urgent matters',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: siteData.contact.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(siteData.contact.location)}`,
      description: 'Available for local meetings',
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 24 hours',
      href: null,
      description: 'Typical response time',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: siteData.contact.github,
      username: '@ps-Dev',
      description: 'View my open source work',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: siteData.contact.linkedin,
      username: 'Peter Njuguna',
      description: 'Connect professionally',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: siteData.social.twitter,
      username: '@ps_dev_ke',
      description: 'Follow for updates',
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary-900/10 via-background to-accent-900/10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 block font-medium text-accent-400"
              >
                Get In Touch
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 font-display text-4xl font-bold text-text-primary md:text-5xl"
              >
                Let's Create Something{' '}
                <span className="text-gradient">Amazing</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary"
              >
                I'm always excited to discuss new projects, creative ideas, or
                opportunities to be part of your vision. Let's connect and
                explore how we can work together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center space-x-2 text-sm text-text-secondary"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent-400"></div>
                <span>{siteData.settings.availability}</span>
                <span>•</span>
                <span>Usually responds within 24 hours</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Ways to Reach Me
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                Choose your preferred method of communication. I'm here to help
                bring your ideas to life.
              </p>
            </motion.div>

            <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card group text-center transition-colors duration-300 hover:bg-surface-hover"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600/10 transition-colors duration-300 group-hover:bg-primary-600/20">
                    <method.icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {method.title}
                  </h3>
                  <p className="mb-3 text-sm text-text-secondary">
                    {method.description}
                  </p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        method.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="rounded-md font-medium text-primary-400 transition-colors duration-200 hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {method.details}
                    </a>
                  ) : (
                    <span className="font-medium text-primary-400">
                      {method.details}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h3 className="mb-8 font-display text-2xl font-bold text-text-primary">
                Connect on Social Media
              </h3>
              <div className="mx-auto flex max-w-3xl flex-col justify-center gap-6 md:flex-row">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="card group flex items-center space-x-4 p-6 transition-all duration-300 hover:bg-surface-hover"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-600/10 transition-colors duration-300 group-hover:bg-accent-600/20">
                      <social.icon className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="mb-1 font-semibold text-text-primary">
                        {social.name}
                      </h4>
                      <p className="mb-1 text-sm text-text-secondary">
                        {social.description}
                      </p>
                      <span className="text-sm text-accent-400">
                        {social.username}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section bg-surface/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <MessageSquare className="mx-auto mb-6 h-16 w-16 text-primary-400" />
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Send Me a Message
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                Have a specific project in mind? Fill out the form below with
                details about your requirements, timeline, and budget, and I'll
                get back to you as soon as possible.
              </p>
            </motion.div>

            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-2xl text-text-secondary">
                Quick answers to common questions about working together.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {[
                {
                  question: "What's your typical project timeline?",
                  answer:
                    "Project timelines vary depending on complexity. A simple landing page might take 1-2 weeks, while a full web application could take 6-12 weeks. I'll provide a detailed timeline during our initial consultation.",
                },
                {
                  question: 'Do you work with international clients?',
                  answer:
                    'Absolutely! I work with clients worldwide and am comfortable collaborating across different time zones. Most of my communication happens asynchronously through email and project management tools.',
                },
                {
                  question: 'What technologies do you specialize in?',
                  answer:
                    "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I'm always learning new technologies to provide the best solutions for each project.",
                },
                {
                  question: 'Do you provide ongoing maintenance?',
                  answer:
                    'Yes! I offer maintenance packages for ongoing support, updates, and feature additions. We can discuss the best maintenance plan during project planning.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.question.slice(0, 20) || `faq-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="mb-3 text-lg font-semibold text-text-primary">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-text-secondary">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
