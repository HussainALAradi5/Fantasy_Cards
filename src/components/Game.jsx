import { useEffect, useState } from 'react'
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
  const [remainingTurns, setRemainingTurns] = useState(null)
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [selected, setSelected] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [gameOver, setGameOver] = useState(false)

  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setElapsedTime(0)
    setRemainingTime(difficulty === 'normal' ? 180 : 0)
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
    setSelected(false)
    if (difficulty === 'challenging') {
      setRemainingTurns((prevTurns) => {
        if (prevTurns <= 1) {
          setGameOver(true)
          return 0
        }
        return prevTurns - 1
      })
    }
  }

  useEffect(() => {
    let timer
    if (difficulty === 'normal' && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setGameOver(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [difficulty, gameOver])

  useEffect(() => {
    if (
      difficulty === 'challenging' &&
      remainingTurns !== null &&
      remainingTurns <= 0
    ) {
      setGameOver(true)
    }
  }, [remainingTurns, difficulty])

  useEffect(() => {
    shuffle()
  }, [difficulty])

  return (
    <div className="game">
      <Difficulties
        setDifficulty={setDifficulty}
        setGameOver={setGameOver}
        setTurns={setTurns}
        setCards={setCards}
        shuffle={shuffle}
      />
      <div className="gamePanel">
        <button onClick={shuffle}>New Game</button>
        <p>Turns: {turns}</p>
        {difficulty === 'normal' && (
          <>
            <p>Elapsed Time: {elapsedTime}s</p>
            <p>
              Remaining Time: {Math.floor(remainingTime / 60)}:
              {remainingTime % 60} minutes
            </p>
          </>
        )}
        {difficulty === 'challenging' && remainingTurns !== null && (
          <p>Remaining Turns: {remainingTurns}</p>
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
