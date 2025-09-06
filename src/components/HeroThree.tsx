'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Generate particle positions for the wave effect
function generateWaveParticles(count: number) {
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 10
    
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }
  
  return positions
}

interface ParticleWaveProps {
  mouse: { x: number; y: number }
}

function ParticleWave({ mouse }: ParticleWaveProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  // Generate particles with reduced count for performance (<20k vertices as specified)
  const particleCount = 3000
  const positions = useMemo(() => generateWaveParticles(particleCount), [])
  
  useFrame((state) => {
    if (!ref.current) return
    
    const time = state.clock.getElapsedTime()
    const points = ref.current.geometry.attributes.position
    
    // Create wave animation with mouse interaction
    for (let i = 0; i < particleCount; i++) {
      const x = points.getX(i)
      const z = points.getZ(i)
      
      // Base wave pattern
      const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.3
      const wave2 = Math.cos(z * 0.3 + time * 0.3) * 0.2
      
      // Mouse interaction effect
      const mouseInfluence = 0.5
      const distanceX = (mouse.x * viewport.width) / 2 - x
      const distanceZ = (mouse.y * viewport.height) / 2 - z
      const distance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ)
      const mouseEffect = Math.max(0, 2 - distance) * mouseInfluence
      
      // Combine effects
      const newY = wave1 + wave2 + mouseEffect
      points.setY(i, newY)
    }
    
    points.needsUpdate = true
    
    // Gentle rotation for ambient motion
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.1
  })
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function BackgroundGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Subtle floating animation
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.1
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.2
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color="#22D3EE"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  )
}

interface HeroThreeProps {
  className?: string
}

export default function HeroThree({ className = '' }: HeroThreeProps) {
  const mouseRef = useRef({ x: 0, y: 0 })
  
  // Mouse tracking for interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouch, { passive: true })
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])
  
  // Fallback for reduced motion users
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false
  
  if (prefersReducedMotion) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-primary-800/20 via-background to-accent-800/20`}
        aria-hidden="true"
      />
    )
  }
  
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]} // Optimize for different pixel ratios
        performance={{ min: 0.5 }} // Performance optimization
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        {/* Interactive particle wave */}
        <ParticleWave mouse={mouseRef.current} />
        
        {/* Background geometric shape */}
        <BackgroundGeometry />
        
        {/* Fog for depth effect */}
        <fog attach="fog" args={['#0B1020', 8, 20]} />
      </Canvas>
    </div>
  )
}