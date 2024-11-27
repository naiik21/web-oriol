interface AnimationValues {
  newScale: number
  newOpacity: number
}

export const calculateAnimationValues = (
  element: HTMLElement,
  isInView: boolean
): AnimationValues => {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const elementCenter = rect.top + rect.height / 2
  const distanceFromCenter = Math.abs(viewportHeight / 2 - elementCenter)
  const maxDistance = viewportHeight / 2.5 // Adjusted for smoother transition

  if (!isInView) {
    return {
      newScale: 1,
      newOpacity: 0
    }
  }

  const distanceRatio = Math.min(
    Math.max(distanceFromCenter / maxDistance, 0),
    1
  )
  const scaleRange = 0.3 // Maximum scale increase
  const newScale = 1 + (1 - distanceRatio) * scaleRange
  const newOpacity = Math.max(0, Math.min(1, 1 - distanceRatio))

  return {
    newScale,
    newOpacity
  }
}
