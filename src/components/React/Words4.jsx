import './styles.css'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export default function Words4() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      <motion.div className='progress-bar' style={{ scaleX }} />
    </>
  )
}
