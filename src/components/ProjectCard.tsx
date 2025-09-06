'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  stack: string[]
  image: string
  github: string
  live?: string | null
  featured?: boolean
  category: string
  className?: string
}

export default function ProjectCard({
  id,
  title,
  description,
  stack,
  image,
  github,
  live,
  featured = false,
  category,
  className = '',
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative card-hover overflow-hidden',
        featured && 'ring-1 ring-primary-500/20',
        className
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 z-10 flex items-center space-x-1 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium"
        >
          <Star className="w-3 h-3" />
          <span>Featured</span>
        </motion.div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl bg-surface">
        <Image
          src={image}
          alt={`${title} project screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.style.display = 'none'
          }}
        />
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {live && (
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </motion.a>
          )}
          
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-surface text-text-primary px-4 py-2 rounded-lg hover:bg-surface-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </motion.a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category and Title */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs font-medium text-accent-400 uppercase tracking-wider">
              {category}
            </span>
            <h3 className="text-xl font-display font-semibold text-text-primary mt-1 group-hover:text-primary-400 transition-colors duration-200">
              <Link 
                href={`/projects/${id}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              >
                {title}
              </Link>
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="px-2 py-1 text-xs font-medium bg-primary-600/10 text-primary-400 rounded-md border border-primary-600/20"
            >
              {tech}
            </motion.span>
          ))}
          {stack.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-surface text-text-secondary rounded-md">
              +{stack.length - 4} more
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href={`/projects/${id}`}
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
          >
            Learn more →
          </Link>
          
          <div className="flex items-center space-x-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1"
                aria-label={`View ${title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-1"
              aria-label={`View ${title} source code on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Skeleton component for loading states
export function ProjectCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-48 bg-surface rounded-t-xl"></div>
      <div className="p-6">
        <div className="h-4 bg-surface rounded w-16 mb-2"></div>
        <div className="h-6 bg-surface rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-surface rounded w-full"></div>
          <div className="h-3 bg-surface rounded w-5/6"></div>
          <div className="h-3 bg-surface rounded w-4/6"></div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-surface rounded w-16"></div>
          <div className="h-6 bg-surface rounded w-20"></div>
          <div className="h-6 bg-surface rounded w-18"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-surface rounded w-20"></div>
          <div className="flex gap-3">
            <div className="w-4 h-4 bg-surface rounded"></div>
            <div className="w-4 h-4 bg-surface rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}