import './styles.css'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface Props {
  word: string
  hueA: number
  hueB: number
}

const cardVariants: Variants = {
  offscreen: {
    scale: 0.5, // Empezamos más pequeño
    opacity: 1 // Totalmente visible
  },
  onscreen: {
    scale: 3, // Escalamos para que crezca
    opacity: 0, // Desaparece al final de la animación
    transition: {
      type: 'spring',
      duration: 4 // Aumentamos un poco la duración
    }
  }
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

function Card({ word, hueA, hueB }: Props) {
  return (
    <motion.div
      className='card-container'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}>
      <div className='splash' />
      <motion.div className='card' variants={cardVariants}>
        {word}
      </motion.div>
    </motion.div>
  )
}

const words: [string, number, number][] = [
  ['Skere', 340, 10],
  ['Mucho Skere', 20, 40],
  ['El rio', 60, 90],
  ['Una mierda', 80, 120],
  ['Hoy', 100, 140],
  ['es', 205, 245],
  ['viernes', 260, 290],
  ['Y elcuerpo lo sabe', 290, 320]
]

export default function App() {
  return words.map(([word, hueA, hueB]) => (
    <Card word={word} hueA={hueA} hueB={hueB} key={word} />
  ))
}
