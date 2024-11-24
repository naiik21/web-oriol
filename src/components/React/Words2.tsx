import React, { useEffect, useState, useRef } from 'react'

const ScrollEffectComponent = ({ phrases }) => {
  const [activeIndex, setActiveIndex] = useState(-1) // Controla qué frase está activa
  const phraseRefs = useRef([]) // Referencias a los elementos

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10)
            setActiveIndex(index) // Activa la animación para esta frase
          }
        })
      },
      { threshold: 0.1 } // Umbral para activar (10% visible)
    )

    // Observa todos los elementos
    phraseRefs.current.forEach((ref) => observer.observe(ref))

    return () => observer.disconnect()
  }, [])

  const maxScroll = 800 // Ajusta según el tamaño de tu página
  const getStyleForPhrase = (index) => {
    const isActive = index === activeIndex // Solo la frase activa anima
    const scale = isActive ? 10 : 1 // Escala al entrar
    const opacity = isActive ? 0 : 1 // Transparente si no es activa

    return {
      fontSize: `${scale}em`,
      opacity,
      transition: 'all 3s ease'
    }
  }

  const getBackgroundStyle = () => ({
    background: activeIndex === phrases.length - 1 ? 'white' : 'transparent',
    transition: 'background 0.5s ease',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  })

  return (
    <div style={{ height: '200vh' }}>
      {/* <div style={getBackgroundStyle()} /> */}
      {phrases.map((phrase, index) => (
        <div
          key={index}
          data-index={index}
          ref={(el) => (phraseRefs.current[index] = el)} // Asocia el ref
          style={getStyleForPhrase(index)}>
          {phrase}
        </div>
      ))}
    </div>
  )
}

export default function Words2() {
  return (
    <ScrollEffectComponent
      phrases={[
        'Primera frase animada',
        'Segunda con otro estilo',
        'Aquí hay más creatividad',
        'Última frase para fondo blanco'
      ]}
    />
  )
}
