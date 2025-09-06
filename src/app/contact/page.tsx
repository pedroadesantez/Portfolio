'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react'
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
      description: 'Send me an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: siteData.contact.phone,
      href: `tel:${siteData.contact.phone}`,
      description: 'Call or text for urgent matters'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: siteData.contact.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(siteData.contact.location)}`,
      description: 'Available for local meetings'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 24 hours',
      href: null,
      description: 'Typical response time'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: siteData.contact.github,
      username: '@ps-Dev',
      description: 'View my open source work'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: siteData.contact.linkedin,
      username: 'Peter Njuguna',
      description: 'Connect professionally'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: siteData.social.twitter,
      username: '@ps_dev_ke',
      description: 'Follow for updates'
    }
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
              className="text-center max-w-4xl mx-auto"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-accent-400 font-medium mb-4 block"
              >
                Get In Touch
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6"
              >
                Let's Create Something <span className="text-gradient">Amazing</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              >
                I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision. 
                Let's connect and explore how we can work together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center space-x-2 text-sm text-text-secondary"
              >
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Ways to Reach Me
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Choose your preferred method of communication. I'm here to help bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center hover:bg-surface-hover transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600/20 transition-colors duration-300">
                    <method.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{method.title}</h3>
                  <p className="text-text-secondary text-sm mb-3">{method.description}</p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                    >
                      {method.details}
                    </a>
                  ) : (
                    <span className="text-primary-400 font-medium">{method.details}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-2xl font-display font-bold text-text-primary mb-8">
                Connect on Social Media
              </h3>
              <div className="flex flex-col md:flex-row gap-6 justify-center max-w-3xl mx-auto">
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
                    className="card flex items-center space-x-4 p-6 hover:bg-surface-hover transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent-600/10 rounded-full flex items-center justify-center group-hover:bg-accent-600/20 transition-colors duration-300">
                      <social.icon className="w-6 h-6 text-accent-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-text-primary mb-1">{social.name}</h4>
                      <p className="text-sm text-text-secondary mb-1">{social.description}</p>
                      <span className="text-sm text-accent-400">{social.username}</span>
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
              className="text-center mb-16"
            >
              <MessageSquare className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Send Me a Message
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Have a specific project in mind? Fill out the form below with details about your requirements, 
                timeline, and budget, and I'll get back to you as soon as possible.
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Quick answers to common questions about working together.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "What's your typical project timeline?",
                  answer: "Project timelines vary depending on complexity. A simple landing page might take 1-2 weeks, while a full web application could take 6-12 weeks. I'll provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you work with international clients?",
                  answer: "Absolutely! I work with clients worldwide and am comfortable collaborating across different time zones. Most of my communication happens asynchronously through email and project management tools."
                },
                {
                  question: "What technologies do you specialize in?",
                  answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I'm always learning new technologies to provide the best solutions for each project."
                },
                {
                  question: "Do you provide ongoing maintenance?",
                  answer: "Yes! I offer maintenance packages for ongoing support, updates, and feature additions. We can discuss the best maintenance plan during project planning."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-3">{faq.question}</h3>
                  <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
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