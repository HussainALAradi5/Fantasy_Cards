import { useEffect, useState } from 'react'
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
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleCard = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.src === secondCard.src) {
        console.log('same card in both src')
        newTurn()
      } else {
        console.log('distinct cards')
        newTurn()
      }
    }
  }, [firstCard, secondCard])
  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(turns + 1)
  }
  return (
    <div className="game">
      <button onClick={shuffle}>new game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleCard={handleCard} />
        ))}
      </div>
    </div>
  )
}

export default Game
