'use client'

import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * ClientOnly component prevents hydration mismatches by only rendering
 * children on the client side after hydration is complete.
 *
 * Use this for components that:
 * - Use window/document APIs
 * - Have dynamic content that differs between server and client
 * - Need to prevent SSR/hydration issues
 */
export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
