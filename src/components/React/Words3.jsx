import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Words3 = ({ phrases }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const controls = useAnimation()
  const { ref, inView } = useInView({ triggerOnce: false })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 }
  }

  useEffect(() => {
    if (inView && activeIndex < phrases.length) {
      const timeout = setTimeout(() => {
        setActiveIndex((prev) => prev + 1)
      }, 1000) // Controla la duración de cada frase
      return () => clearTimeout(timeout)
    }
  }, [inView, activeIndex, phrases.length])

  return (
    <div ref={ref} style={{ overflow: 'hidden', height: '100vh' }}>
      {phrases.map((phrase, index) => (
        <motion.div
          key={index}
          initial='hidden'
          animate={activeIndex === index ? 'visible' : 'hidden'}
          exit='exit'
          variants={variants}
          transition={{ duration: 1 }}
          style={{
            // position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem'
          }}>
          {phrase}
        </motion.div>
      ))}
    </div>
  )
}

export default Words3
