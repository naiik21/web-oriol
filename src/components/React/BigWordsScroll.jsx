import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utilities/global'

const words = [
  'Capturando cada emoción y detalle',
  'Narrativas que dejan huella',
  'Visuales que conectan con tu audiencia',
  'Momentos que merecen ser recordados',
  'Emociones reales'
]

const fontSizes = [
  `${Math.random() * 2 + 3}rem`,
  `${Math.random() * 4.5 + 5}rem`,
  `${Math.random() * 1.5 + 2}rem`,
  `${Math.random() * 3 + 4}rem`,
  '1rem'
]

const topPositions = [
  `${Math.random() * 40 + 10}%`,
  `${Math.random() * 40 + 10}%`,
  `${Math.random() * (90 - 60) + 60}%`,
  `${Math.random() * (90 - 60) + 60}%`,
  '50%'
]
const leftPositions = [
  `${Math.random() * 15 + 0}%`,
  `${Math.random() * (90 - 60) + 60}%`,
  `${Math.random() * (90 - 60) + 60}%`,
  `${Math.random() * 15 + 0}%`,
  '50%'
]

const topPositionsEnd = [
  `800%`,
  `${Math.random() * 5 + -5}%`,
  `-1800%`,
  `${Math.random() * 10 + -5}%`,
  '50%'
]
const leftPositionsEnd = [
  `${Math.random() * 5 + -5}%`,
  `-600%`,
  `${Math.random() * 5 + -5}%`,
  `800%`,
  '50%'
]

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

      if (wordRefs.current.length) {
        wordRefs.current.forEach((word, index) => {
          const scaleEnd =
            index === wordRefs.current.length - 1 ? 200 : 5 + index * 2
          const positionEnd =
            index === wordRefs.current.length - 1
              ? { top: '50%', left: '50%', x: '-50%', y: '-50%' }
              : {
                  x: leftPositionsEnd[index],
                  y: topPositionsEnd[index]
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
        overflow: 'hidden'
      }}>
      {words.map((word, index) => (
        <div
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          style={{
            position: 'absolute',
            top: topPositions[index],
            left: leftPositions[index],
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
