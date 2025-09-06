'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Star } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import siteData from '@/data/site-data.json'
import { cn } from '@/lib/utils'

const categories = ['All', ...Array.from(new Set(siteData.projects.map(p => p.category)))]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter projects based on search query and category
  const filteredProjects = useMemo(() => {
    return siteData.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Sort projects: featured first, then by id
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.id.localeCompare(b.id)
    })
  }, [filteredProjects])

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
                My Work
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6"
              >
                Projects & <span className="text-gradient">Portfolio</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              >
                A collection of projects that showcase my skills in modern web development, 
                from full-stack applications to creative experiments with emerging technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">{siteData.projects.length}</div>
                  <div className="text-sm text-text-secondary">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {siteData.projects.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-text-secondary">Featured</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">
                    {Array.from(new Set(siteData.projects.flatMap(p => p.stack))).length}
                  </div>
                  <div className="text-sm text-text-secondary">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">{categories.length - 1}</div>
                  <div className="text-sm text-text-secondary">Categories</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className="py-8 bg-surface/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            >
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary placeholder-text-secondary transition-colors duration-200"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-surface border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-text-primary text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-surface border border-glass-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded transition-colors duration-200',
                      viewMode === 'grid' 
                        ? 'bg-primary-600 text-white' 
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded transition-colors duration-200',
                      viewMode === 'list' 
                        ? 'bg-primary-600 text-white' 
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-text-secondary"
            >
              {filteredProjects.length > 0 ? (
                <>Showing {filteredProjects.length} of {siteData.projects.length} projects</>
              ) : (
                <>No projects found matching your criteria</>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section">
          <div className="container">
            <AnimatePresence mode="wait">
              {sortedProjects.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${searchQuery}-${viewMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    'grid gap-8',
                    viewMode === 'grid' 
                      ? 'md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1 max-w-4xl mx-auto'
                  )}
                >
                  {sortedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={viewMode === 'list' ? 'w-full' : ''}
                    >
                      <ProjectCard 
                        {...project} 
                        className={viewMode === 'list' ? 'lg:flex lg:items-center lg:space-x-6' : ''}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-text-secondary mb-6 max-w-md mx-auto">
                    Try adjusting your search query or category filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                    }}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Featured Technologies */}
        <section className="section bg-surface/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Technologies Used
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A comprehensive overview of the technologies and tools featured across my projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {Array.from(new Set(siteData.projects.flatMap(p => p.stack)))
                .sort()
                .map((tech, index) => {
                  const projectCount = siteData.projects.filter(p => p.stack.includes(tech)).length
                  return (
                    <motion.button
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSearchQuery(tech)}
                      className="px-4 py-2 bg-surface hover:bg-surface-hover border border-glass-border rounded-lg transition-all duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <span className="text-text-primary font-medium group-hover:text-primary-400 transition-colors duration-200">
                        {tech}
                      </span>
                      <span className="ml-2 text-xs text-text-secondary">
                        ({projectCount})
                      </span>
                    </motion.button>
                  )
                })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card max-w-4xl mx-auto text-center"
            >
              <Star className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                I'm always excited to work on new and challenging projects. 
                Let's discuss how we can bring your ideas to life with modern web technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary">
                  Start a Project
                </a>
                <a href={siteData.contact.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}