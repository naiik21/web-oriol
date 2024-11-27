import React from 'react'
import { ScrollPhrase } from './ScrollPhrase'
import { phrases } from './data/phrases'

export const ScrollContainer: React.FC = () => {
  return (
    <div className='relative min-h-[400vh] bg-gradient-to-b from-blue-50 via-purple-50 to-blue-50'>
      <div className='fixed inset-0 overflow-hidden'>
        {phrases.map((phrase, index) => (
          <ScrollPhrase
            key={index}
            phrase={phrase.text}
            delay={index * 150}
            initialPosition={phrase.position}
          />
        ))}
      </div>
    </div>
  )
}
