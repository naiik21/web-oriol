import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

export function Globe() {
  const canvasRef = useRef()
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001
    }
  }))
  useEffect(() => {
    let phi = 0
    let width = 0
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [-33.880813, 151.207923], size: 0.1 }, //Sídney
        { location: [-16.919923, 145.76142], size: 0.07 }, //Cairns
        { location: [31.089809, 121.376008], size: 0.03 }, //Shanghái
        { location: [51.476034, -0.163432], size: 0.02 }, //Londres
        { location: [40.385562, -3.695469], size: 0.15 }, //Madríd
        { location: [13.797088, 100.649347], size: 0.03 }, //Baonkok
        { location: [37.758671, -122.455465], size: 0.02 }, //San Francisco
        { location: [-12.367551, -74.434533], size: 0.02 }, //Peru
        { location: [64.320273, -18.792529], size: 0.04 }, //Islandia
        { location: [42.187097, 13.079283], size: 0.06 }, //Italia
        { location: [45.692713, 16.070521], size: 0.03 }, //Croacia
        { location: [52.239098, 4.868355], size: 0.02 }, //Holanda
        { location: [-1.757445, 37.116407], size: 0.04 } //Kenia
      ],
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.005
        }
        state.phi = phi + r.get()
        state.width = width * 2
        state.height = width * 2
      }
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'))
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <div
      style={{
        backgroundColor: '#0d0d0d',
        border: '0px'
      }}>
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          aspectRatio: 1,
          margin: 'auto',
          position: 'relative'
        }}>
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current
            canvasRef.current.style.cursor = 'grabbing'
          }}
          onPointerUp={() => {
            pointerInteracting.current = null
            canvasRef.current.style.cursor = 'grab'
          }}
          onPointerOut={() => {
            pointerInteracting.current = null
            canvasRef.current.style.cursor = 'grab'
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              api.start({
                r: delta / 200
              })
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              api.start({
                r: delta / 100
              })
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout paint size',
            opacity: 0,
            transition: 'opacity 1s ease'
          }}
        />
      </div>
    </div>
  )
}
