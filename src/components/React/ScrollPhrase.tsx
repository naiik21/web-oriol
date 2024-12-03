import React, { useRef } from 'react'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useInView } from './hooks/useInView'
import { PhraseText } from './PhraseText'

interface ScrollPhraseProps {
  phrase: string
  delay: number
  initialPosition: {
    top: number
    left: number
  }
}

export const ScrollPhrase: React.FC<ScrollPhraseProps> = ({
  phrase,
  delay,
  initialPosition
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(elementRef)
  const { scale, opacity } = useScrollAnimation(elementRef, isInView)

  return (
    <div
      ref={elementRef}
      className=' transform transition-all duration-700 ease-in-out'
      style={{
        top: `${initialPosition.top}vh`,
        left: `${initialPosition.left}vw`,
        transform: `scale(${scale})`,
        opacity: opacity,
        transitionDelay: `${delay}ms`
      }}>
      <PhraseText text={phrase} />
    </div>
  )
}
