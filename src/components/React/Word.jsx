import React, { useEffect, useRef, useState } from 'react'

function Word() {
  const [scale, setScale] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState('#d9d9d9')
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1 // Start when 10% of the element is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const handleScroll = () => {
      if (!containerRef.current || !sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const sectionTop = rect.top

      // Calculate progress based on section position
      const progress = Math.min(
        Math.max(-sectionTop / (sectionHeight - window.innerHeight), 0),
        1
      )

      // Smooth scale from 0 to 100
      const newScale = progress * 100
      setScale(newScale)

      // Only change background color when scale is at 99% or higher
      if (newScale > 99) {
        setBackgroundColor('#0D0D0D')
      } else {
        setBackgroundColor('#d9d9d9')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  return (
    <div className='relative'>
      {/* Animation section */}
      <div ref={sectionRef} className='relative h-[200vh]'>
        <div
          ref={containerRef}
          className='sticky top-0 h-screen flex items-center justify-center overflow-hidden'
          style={{
            backgroundColor,
            transition: 'background-color 0.8s ease-out'
          }}>
          <div
            className='text-center relative'
            style={{
              transform: `scale(${Math.max(1, scale / 2)})`,
              transition: 'transform 1.5s ease-out',
              fontSize: '2rem',
              fontWeight: 'bold',
              opacity: Math.min(1, scale / 10)
            }}>
            Capturando cada emoción y detalle
          </div>
        </div>
      </div>
    </div>
  )
}

export default Word
