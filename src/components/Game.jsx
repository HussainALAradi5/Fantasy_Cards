import { useEffect, useState } from 'react'
import Card from './Card'
const Game = () => {
  const images = [
    { src: '/img/angry_troll.png', matched: false },
    { src: '/img/blu_happy.png', matched: false },
    { src: '/img/brave_knight.jpg', matched: false },
    { src: '/img/happy_knight_and_dragon.jpg', matched: false },
    { src: '/img/knight_helmet.png', matched: false },
    { src: '/img/knight.avif', matched: false },
    { src: '/img/pink_happy.png', matched: false }
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
  const isFlipped = (card) => {
    return card === firstCard || card === secondCard || card.matched
  }
  const handleCard = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.src === secondCard.src) {
        setCards(
          cards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        )
        newTurn()
      } else {
        setTimeout(() => newTurn(), 2000)
      }
    }
  }, [firstCard, secondCard])
  console.log(cards)

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
          <Card
            key={card.id}
            card={card}
            handleCard={handleCard}
            flipped={isFlipped(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default Game
