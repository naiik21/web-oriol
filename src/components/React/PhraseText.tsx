import React from 'react'

interface PhraseTextProps {
  text: string
}

export const PhraseText: React.FC<PhraseTextProps> = ({ text }) => {
  return (
    <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 whitespace-nowrap'>
      {text}
    </p>
  )
}
