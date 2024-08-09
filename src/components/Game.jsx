import React, { useState, useEffect } from 'react'
import Card from './Card'
import Difficulties from './Difficulties'

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
  const [elapsedTime, setElapsedTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [selected, setSelected] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [gameOver, setGameOver] = useState(false)
  const [remainingTurns, setRemainingTurns] = useState(null)

  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setElapsedTime(0)
    setRemainingTime(
      difficulty === 'normal' || difficulty === 'challenging' ? 180 : 0
    )
    setRemainingTurns(difficulty === 'challenging' ? 20 : null)
    setFirstCard(null)
    setSecondCard(null)
    setGameOver(false)
    setSelected(false)
  }

  const isFlipped = (card) => {
    return card === firstCard || card === secondCard || card.matched
  }

  const handleCard = (card) => {
    if (selected || card === firstCard || gameOver) return

    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setSelected(true)
      if (firstCard.src === secondCard.src) {
        setCards(
          cards.map((card) =>
            card.src === firstCard.src ? { ...card, matched: true } : card
          )
        )
        newTurn()
      } else {
        setTimeout(() => newTurn(), 2000)
      }
    }
  }, [firstCard, secondCard, cards])

  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(turns + 1)
    setSelected(false) // Reset selected to false to allow further clicks
    if (difficulty === 'challenging' && remainingTurns !== null) {
      setRemainingTurns((prev) => prev - 1)
      if (remainingTurns <= 0) {
        setGameOver(true)
      }
    }
  }

  return (
    <div className="game">
      <Difficulties
        setDifficulty={setDifficulty}
        setGameOver={setGameOver}
        setTurns={setTurns}
        shuffle={shuffle}
        setElapsedTime={setElapsedTime}
        setRemainingTime={setRemainingTime}
        setRemainingTurns={setRemainingTurns}
      />
      <div className="gamePanel">
        <button onClick={shuffle}>New Game</button>
        <p>Turns: {turns}</p>
        {difficulty === 'normal' && (
          <>
            <p>Elapsed Time: {elapsedTime}s</p>
            <p>
              Remaining Time: {Math.floor(remainingTime / 60)}:
              {remainingTime % 60}
            </p>
          </>
        )}
        {difficulty === 'challenging' && remainingTurns !== null && (
          <>
            <p>Elapsed Time: {elapsedTime}s</p>
            <p>Remaining Time: {remainingTime} s</p>
            <p>Remaining Turns: {remainingTurns}</p>
          </>
        )}
        {gameOver && <p>Game Over!</p>}
      </div>
      {!gameOver ? (
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
      ) : (
        <p>Game Over! Refresh to play again.</p>
      )}
    </div>
  )
}

export default Game
