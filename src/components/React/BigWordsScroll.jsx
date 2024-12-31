import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra el plugin de ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const words = ['Primera', 'Segunda', 'Tercera', '¡Final!']

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

    if (wordRefs.current.length) {
      wordRefs.current.forEach((word, index) => {
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
            backgroundColor: '#0D0D0D',
            duration: 0.2
          })
        }
      })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const generateRandomStyles = () => {
    return words.map(() => ({
      top: `${Math.random() * 40 + 30}%`, // Rango de posición más centrado
      left: `${Math.random() * 40 + 30}%`, // Rango de posición más centrado
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
