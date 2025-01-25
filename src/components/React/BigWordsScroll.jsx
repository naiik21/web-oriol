import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utilities/global'

const words = ['Capturando cada emoción y detalle']

const BigWordsScroll = () => {
  const containerRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current

    const initAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom+=300% top',
          scrub: 3.5, // Hace que la animación sea más lenta
          pin: true
        }
      })

      if (wordRefs.current.length) {
        wordRefs.current.forEach((word, index) => {
          const scaleEnd =
            index === wordRefs.current.length - 1 ? 200 : 5 + index * 2
          tl.to(word, {
            scale: scaleEnd,
            opacity: 1,
            duration: 4,
            transition: 'power4.inOut'
          })

          if (index === wordRefs.current.length - 1) {
            tl.to(container, {
              backgroundColor: '#0D0D0D',
              duration: 0.2
            })
          }
        })
      }
    }

    requestAnimationFrame(initAnimation)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'relative',
        backgroundColor: '#d9d9d9',
        overflow: 'hidden',
        display: 'flex', // Agrega flexbox para centrar
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center' // Centra verticalmente
      }}>
      {words.map((word, index) => (
        <div
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          style={{
            position: 'absolute',
            fontSize: '3rem', // Aumenta el tamaño para mayor visibilidad
            fontWeight: 'bold',
            color: '#0D0D0D',
            whiteSpace: 'nowrap',
            transform: 'scale(0)'
          }}>
          {word}
        </div>
      ))}
    </div>
  )
}

export default BigWordsScroll
