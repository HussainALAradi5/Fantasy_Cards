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
  const [selected, setSelected] = useState(false)

  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setFirstCard(null)
    setSecondCard(null)
  }

  const isFlipped = (card) => {
    return card === firstCard || card === secondCard || card.matched
  }

  const handleCard = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setSelected(true)
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
  }, [firstCard, secondCard, cards]) // Add `cards` as a dependency

  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(turns + 1)
    setSelected(false)
  }

  useEffect(() => {
    shuffle()
  }, []) // Empty dependency array to run only once on component mount

  return (
    <div className="game">
      <div className="gamePanel">
        <button onClick={shuffle}>new game</button>
        <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleCard={handleCard}
            flipped={isFlipped(card)}
            disabled={selected}
          />
        ))}
      </div>
    </div>
  )
}

export default Game
