'use client'

import createGlobe from 'cobe'
import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

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
    { location: [-33.880813, 151.207923], size: 0.1 }, //Sídney
    { location: [-16.919923, 145.76142], size: 0.07 }, //Cairns
    { location: [31.089809, 121.376008], size: 0.03 }, //Shanghái
    { location: [51.476034, -0.163432], size: 0.04 }, //Londres
    { location: [40.385562, -3.695469], size: 0.15 }, //Madríd
    { location: [13.797088, 100.649347], size: 0.04 }, //Baonkok
    { location: [37.758671, -122.455465], size: 0.04 }, //San Francisco
    { location: [-12.367551, -74.434533], size: 0.04 }, //Peru
    { location: [64.320273, -18.792529], size: 0.04 }, //Islandia
    { location: [42.187097, 13.079283], size: 0.06 }, //Italia
    { location: [45.692713, 16.070521], size: 0.03 }, //Croacia
    { location: [52.239098, 4.868355], size: 0.04 }, //Holanda
    { location: [-1.757445, 37.116407], size: 0.04 } //Kenia
  ]
}

export function GitHubGlobe({ className, config = GLOBE_CONFIG }) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100
  })

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
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
      }
    })

    setTimeout(() => (canvasRef.current!.style.opacity = '1'), 0)
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [rs, config])

  return (
    <div
      style={{
        backgroundColor: '#0d0d0d',
        border: '0px',
        paddingTop: '50px'
      }}>
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
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX
            updatePointerInteraction(e.clientX)
          }}
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
