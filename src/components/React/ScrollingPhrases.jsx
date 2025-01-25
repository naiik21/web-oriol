import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const words = [
  'Capturando cada emoción y detalle',
  'Narrativas que dejan huella',
  'Visuales que conectan con tu audiencia',
  'Momentos que merecen ser recordados',
  'Emociones reales'
]

const fontSizes = [
  `${Math.random() * 2 + 3}rem`,
  `${Math.random() * 2.5 + 3}rem`,
  `${Math.random() * 1 + 1.5}rem`,
  `${Math.random() * 3 + 4}rem`,
  '1rem'
]

const initialPositions = words.map(() => ({
  top: `${Math.random() * 40 + 10}%`,
  left: `${Math.random() * 80}%`
}))

const finalPositions = words.map(() => ({
  top: `${Math.random() * 10 - 5}%`,
  left: `${Math.random() * 10 - 5}%`
}))

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
          scrub: true,
          pin: true
        }
      })

      wordRefs.current.forEach((word, index) => {
        const scaleEnd =
          index === wordRefs.current.length - 1 ? 200 : 5 + index * 2
        const finalPosition =
          index === wordRefs.current.length - 1
            ? { top: '50%', left: '50%', x: '-50%', y: '-50%' }
            : finalPositions[index]

        tl.fromTo(
          word,
          {
            opacity: 0,
            scale: 0,
            top: initialPositions[index].top,
            left: initialPositions[index].left
          },
          {
            opacity: 1,
            scale: scaleEnd,
            ...finalPosition,
            duration: 2,
            ease: 'power3.out'
          },
          index * 0.5
        )

        if (index === wordRefs.current.length - 1) {
          tl.to(container, {
            backgroundColor: '#0D0D0D',
            duration: 0.2
          })
        }
      })
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
        overflow: 'hidden'
      }}>
      {words.map((word, index) => (
        <div
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          style={{
            position: 'absolute',
            fontSize: fontSizes[index],
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
