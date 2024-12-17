import React, { useEffect, useState } from 'react'

const words = ['Primera', 'Segunda', 'Tercera', '¡Final!']

const BigWordsScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Bloquear el scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden' // Bloquea scroll global
    return () => {
      document.body.style.overflow = 'auto' // Restablece scroll
    }
  }, [])

  // Manejar el progreso del scroll
  const handleScroll = (e) => {
    const delta = e.deltaY
    setScrollProgress((prev) => Math.min(prev + delta * 0.5, 100))
  }

  // Generar posiciones y tamaños aleatorios para cada palabra
  const generateRandomStyles = () => {
    return words.map(() => ({
      top: `${Math.random() * 80 + 10}%`, // Posición vertical aleatoria
      left: `${Math.random() * 80 + 10}%`, // Posición horizontal aleatoria
      fontSize: `${Math.random() * 2 + 3}rem` // Tamaño aleatorio entre 3rem y 5rem
    }))
  }

  const [randomStyles] = useState(generateRandomStyles)

  // Estilos base del contenedor
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden'
  }

  return (
    <div style={containerStyle} onWheel={handleScroll}>
      {words.map((word, index) => {
        const scale = Math.max(
          1,
          1 + (scrollProgress - index * 25) / 25 // Ajusta escala progresivamente
        )

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: randomStyles[index].top,
              left: randomStyles[index].left,
              fontSize: randomStyles[index].fontSize,
              fontWeight: 'bold',
              color: 'white',
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
              transform: `scale(${scale})`,
              opacity: scrollProgress > index * 25 ? 1 : 0.1,
              zIndex: index === words.length - 1 ? 10 : 1 // Última palabra al frente
            }}>
            {word}
          </div>
        )
      })}
    </div>
  )
}

export default BigWordsScroll
