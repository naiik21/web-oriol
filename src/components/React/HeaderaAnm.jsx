import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavbarMenu from '../NavbarMenu.astro'

const HeaderAnm = () => {
  const containerRef = useRef(null)
  const logo = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom+=100% top',
        scrub: true,
        pin: true
      }
    })

    const positionStart = 0
    const positionEnd = 0

    tl.to(logo, {})

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <header ref={containerRef} className='h-screen relative content-trigger'>
      {/* <NavbarMenu /> */}
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
      <img
        ref={logo}
        src='./o-logo.png'
        alt='Logo'
        width='500px'
        height='500px'
        className='absolute logo'
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,.8))'
        }}
      />
      <h1
        className='absolute text-3xl headline'
        style={{
          bottom: '15%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          fontFamily: 'Exo 2, sans-serif',
          textShadow: '3px 3px 5px rgba(0,0,0,0.5)'
        }}>
        Oriol Ortega
      </h1>
    </header>
  )
}

export default HeaderAnm
