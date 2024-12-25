import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeaderAnm = () => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom+=0% top',
        scrub: true,
        pin: true
      }
    })

    // Animación del logo: empieza fuera de la pantalla por abajo y sube
    tl.fromTo(
      logo,
      { y: '100%', opacity: 0 }, // Posición inicial: fuera de la pantalla (abajo) y transparente
      { y: '0%', opacity: 1, duration: 2 } // Posición final: centrado y opaco
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <header ref={containerRef} className='h-screen relative content-trigger'>
      <div className='video-container'>
        <video
          className='absolute top-0'
          width='320'
          height='240'
          muted
          loop
          autoPlay
          style={{ width: '100%', height: 'auto' }}>
          <source
            src='./video-header.mp4'
            type='video/mp4'
            media='(min-width: 1024px)'
          />
          <source
            src='./instagram-video.mp4'
            type='video/mp4'
            media='(max-width: 1023px)'
          />
        </video>
      </div>

      <div
        ref={logoRef}
        className='absolute'
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,.8))'
        }}>
        <img
          src='./o-logo.png'
          alt='Logo'
          width='500px'
          height='500px'
          className=' logo'
        />
        <h1 className='text-3xl flex justify-center headline'>Oriol Ortega</h1>
      </div>
    </header>
  )
}

export default HeaderAnm
