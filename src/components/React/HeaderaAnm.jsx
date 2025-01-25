import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utilities/global'

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

    // Limpiar animaciones y ScrollTrigger al desmontar el componente
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <header ref={containerRef} className='h-screen relative content-trigger'>
      <div className='video-container'>
        <video
          class='absolute top-0 left-0 object-cover w-screen h-screen'
          width='320'
          height='240'
          muted
          loop
          autoPlay
          playsinline
          preload='auto'>
          <source src='./video-header.mp4' type='video/mp4' />
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
      </div>
    </header>
  )
}

export default HeaderAnm
