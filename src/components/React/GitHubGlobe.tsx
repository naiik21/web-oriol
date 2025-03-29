'use client'

import createGlobe from 'cobe'
import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '../../lib/utils'

const MOVEMENT_DAMPING = 12000

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 2,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [-33.880813, 151.207923], size: 0.1 },
    { location: [-16.919923, 145.76142], size: 0.07 },
    { location: [31.089809, 121.376008], size: 0.03 },
    { location: [51.476034, -0.163432], size: 0.04 },
    { location: [40.385562, -3.695469], size: 0.15 },
    { location: [13.797088, 100.649347], size: 0.04 },
    { location: [37.758671, -122.455465], size: 0.04 },
    { location: [-12.367551, -74.434533], size: 0.04 },
    { location: [64.320273, -18.792529], size: 0.04 },
    { location: [42.187097, 13.079283], size: 0.06 },
    { location: [45.692713, 16.070521], size: 0.03 },
    { location: [52.239098, 4.868355], size: 0.04 },
    { location: [-1.757445, 37.116407], size: 0.04 }
  ]
}

// Función para verificar si WebGL está disponible
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

export function GitHubGlobe({ className, config = GLOBE_CONFIG }) {
  let phi = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [globeError, setGlobeError] = useState(false)

  const r = useMotionValue(0)
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 })

  const [width, setWidth] = useState(0)

  const memoizedConfig = useMemo(() => config, [config])
  const scaledWidth = useMemo(() => width * 2, [width])

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setGlobeError(true)
      return
    }

    const onResize = () => {
      if (canvasRef.current) {
        setWidth(canvasRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    try {
      const globe = createGlobe(canvasRef.current!, {
        ...memoizedConfig,
        width: scaledWidth,
        height: scaledWidth,
        onRender: (state) => {
          if (!pointerInteracting.current) phi += 0.005
          state.phi = phi + rs.get()
          state.width = scaledWidth
          state.height = scaledWidth
        }
      })

      requestAnimationFrame(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1'
        }
      })

      return () => {
        globe.destroy()
        window.removeEventListener('resize', onResize)
      }
    } catch (error) {
      console.error('Error inicializando el globo:', error)
      setGlobeError(true)
    }
  }, [rs, memoizedConfig, scaledWidth])

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      requestAnimationFrame(() => r.set(r.get() + delta / MOVEMENT_DAMPING))
    }
  }

  if (globeError) {
    return (
      <div className='flex items-center justify-center h-96 bg-black text-white text-lg'>
        🌍 Tu navegador no soporta WebGL. No se puede mostrar el globo.
      </div>
    )
  }

  return (
    <div
      style={{ backgroundColor: '#0d0d0d', border: '0px', paddingTop: '50px' }}>
      <div
        className={cn(
          'inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]',
          className
        )}>
        <canvas
          className={cn(
            'size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
          )}
          ref={canvasRef}
          onPointerDown={(e) => updatePointerInteraction(e.clientX)}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>
    </div>
  )
}
