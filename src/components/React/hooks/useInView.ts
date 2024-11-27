import { useState, useEffect } from 'react'
import { useScrollPosition } from './useScrollPosition'

export const useInView = (
  elementRef: React.RefObject<HTMLElement>
): boolean => {
  const [isInView, setIsInView] = useState(false)
  const scrollPosition = useScrollPosition()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for smoother transitions
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [scrollPosition])

  return isInView
}
