import { useState } from 'react'
import Card from './Cards'
const Game = () => {
  const images = [
    { src: '/img/angry_troll.png' },
    { src: '/img/blu_happy.png' },
    { src: '/img/brave_knight.jpg' },
    { src: '/img/happy_knight_and_dragon.jpg' },
    { src: '/img/knight_helmet.png' },
    { src: '/img/knight.avif' },
    { src: '/img/pink_happy.png' }
  ]
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  console.log('cards:', cards, 'turns:', turns)

  return (
    <div className="game">
      <button onClick={shuffle}>new game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default Game
