import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['Primera', 'Segunda', 'Tercera', '¡Fital!']

const BigWordsScroll = () => {
  const containerRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom+=300% top',
        scrub: true,
        pin: true
      }
    })

    // Configurar animaciones para cada palabra
    wordRefs.current.forEach((word, index) => {
      const scaleStart = 0.5
      const scaleEnd =
        index === wordRefs.current.length - 1 ? 200 : 5 + index * 2
      const positionEnd =
        index === wordRefs.current.length - 1
          ? { top: '50%', left: '50%', x: '-50%', y: '-50%' }
          : {
              x: `${Math.random() > 0.5 ? 1000 : -1000}%`,
              y: `${Math.random() > 0.5 ? 1000 : -1000}%`
            }

      tl.to(
        word,
        {
          scale: scaleEnd,
          opacity: 1,
          ...positionEnd,
          duration: 1
        },
        index * 0.2
      )

      // Cambiar el fondo si es la última palabra
      if (index === wordRefs.current.length - 1) {
        tl.to(container, {
          backgroundColor: '#0D0D0D', // Cambia al color de fondo deseado
          duration: 0.2
        })
      }
    })

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  const generateRandomStyles = () => {
    return words.map(() => ({
      top: `${Math.random() * 20 + 30}%`, // Aparece más cerca del centro verticalmente
      left: `${Math.random() * 20 + 30}%`, // Aparece más cerca del centro horizontalmente
      fontSize: `${Math.random() * 2 + 3}rem`
    }))
  }

  const randomStyles = generateRandomStyles()

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'relative',
        backgroundColor: '#d9d9d9',
        overflow: 'hidden'
      }}>
      {words.map((word, index) => (
        <div
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          style={{
            position: 'absolute',
            top: randomStyles[index].top,
            left: randomStyles[index].left,
            fontSize: randomStyles[index].fontSize,
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
