interface Phrase {
  text: string
  position: {
    top: number
    left: number
  }
}

export const phrases: Phrase[] = [
  {
    text: 'Dream Big',
    position: { top: 30, left: 20 }
  },
  {
    text: 'Create Often',
    position: { top: 45, left: 55 }
  },
  {
    text: 'Stay Curious',
    position: { top: 60, left: 25 }
  },
  {
    text: 'Be Bold',
    position: { top: 75, left: 60 }
  },
  {
    text: 'Think Different',
    position: { top: 90, left: 30 }
  },
  {
    text: 'Make Magic',
    position: { top: 50, left: 40 }
  },
  {
    text: 'Inspire Others',
    position: { top: 85, left: 15 }
  }
]
