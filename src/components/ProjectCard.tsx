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
        'card-hover group relative overflow-hidden',
        featured && 'ring-1 ring-primary-500/20',
        className
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-4 top-4 z-10 flex items-center space-x-1 rounded-full bg-primary-600 px-2 py-1 text-xs font-medium text-white"
        >
          <Star className="h-3 w-3" />
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
        <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {live && (
            <motion.a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live</span>
            </motion.a>
          )}

          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 rounded-lg bg-surface px-4 py-2 text-text-primary transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </motion.a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category and Title */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-accent-400">
              {category}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-primary-400">
              <Link
                href={`/projects/${id}`}
                className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {title}
              </Link>
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {stack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="rounded-md border border-primary-600/20 bg-primary-600/10 px-2 py-1 text-xs font-medium text-primary-400"
            >
              {tech}
            </motion.span>
          ))}
          {stack.length > 4 && (
            <span className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary">
              +{stack.length - 4} more
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href={`/projects/${id}`}
            className="rounded-md font-medium text-primary-400 transition-colors duration-200 hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Learn more →
          </Link>

          <div className="flex items-center space-x-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1 text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`View ${title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1 text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={`View ${title} source code on GitHub`}
            >
              <Github className="h-4 w-4" />
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
      <div className="h-48 rounded-t-xl bg-surface"></div>
      <div className="p-6">
        <div className="mb-2 h-4 w-16 rounded bg-surface"></div>
        <div className="mb-3 h-6 w-3/4 rounded bg-surface"></div>
        <div className="mb-4 space-y-2">
          <div className="h-3 w-full rounded bg-surface"></div>
          <div className="h-3 w-5/6 rounded bg-surface"></div>
          <div className="h-3 w-4/6 rounded bg-surface"></div>
        </div>
        <div className="mb-4 flex gap-2">
          <div className="h-6 w-16 rounded bg-surface"></div>
          <div className="h-6 w-20 rounded bg-surface"></div>
          <div className="h-6 w-18 rounded bg-surface"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-surface"></div>
          <div className="flex gap-3">
            <div className="h-4 w-4 rounded bg-surface"></div>
            <div className="h-4 w-4 rounded bg-surface"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
