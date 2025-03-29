import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeaderAnm = () => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom+=0% top',
          scrub: true,
          pin: true
        }
      })

      tl.fromTo(
        logoRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 2 }
      )
    }, containerRef) // Contexto para encapsular GSAP y facilitar limpieza

    return () => ctx.revert() // Limpia animaciones al desmontar el componente
  }, [])

  return (
    <header ref={containerRef} className='relative h-screen content-trigger'>
      <div className='absolute inset-0'>
        <video
          className='w-full h-full object-cover'
          muted
          loop
          autoPlay
          playsInline>
          <source src='./video-header.webm' type='video/webm' />
        </video>
      </div>

      <div
        ref={logoRef}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg'>
        <img src='./o-logo.webp' alt='Logo' width='500' height='500' />
      </div>
    </header>
  )
}

export default HeaderAnm
