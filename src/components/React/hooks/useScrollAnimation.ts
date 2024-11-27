import { useState, useEffect, useCallback } from 'react'
import { useScrollPosition } from './useScrollPosition'
import { calculateAnimationValues } from '../utils/animationCalculator'

interface AnimationValues {
  scale: number
  opacity: number
}

export const useScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  isInView: boolean
): AnimationValues => {
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(0)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const currentScrollPosition = useScrollPosition()

  const updateAnimation = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const { newScale, newOpacity } = calculateAnimationValues(element, isInView)

    // Determine scroll direction
    const isScrollingUp = currentScrollPosition < lastScrollPosition

    if (isScrollingUp && !isInView) {
      // When scrolling up and element is out of view, reset to original state
      setScale(1)
      setOpacity(0)
    } else {
      setScale(newScale)
      setOpacity(newOpacity)
    }

    setLastScrollPosition(currentScrollPosition)
  }, [currentScrollPosition, isInView, lastScrollPosition, elementRef])

  useEffect(() => {
    updateAnimation()
  }, [updateAnimation])

  return { scale, opacity }
}
