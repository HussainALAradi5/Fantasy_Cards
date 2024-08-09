import { useState, useEffect } from 'react'
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
  const [difficultySelected, setDifficultySelected] = useState(false)
  const [pairsFound, setPairsFound] = useState(0)
  const [pairsRemaining, setPairsRemaining] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const shuffle = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setElapsedTime(0)
    setRemainingTime(
      difficulty === 'normal' || difficulty === 'challenging' ? 3 : 0
    )
    setRemainingTurns(difficulty === 'challenging' ? 20 : null)
    setFirstCard(null)
    setSecondCard(null)
    setGameOver(false)
    setSelected(false)
    setDifficultySelected(true)
    setPairsFound(0)
    setPairsRemaining(
      difficulty === 'easy' ? 3 : difficulty === 'normal' ? 5 : 6
    )
    setGameWon(false)
  }

  const isFlipped = (card) => {
    return card === firstCard || card === secondCard || card.matched
  }

  const handleCard = (card) => {
    if (selected || card === firstCard || gameOver || gameWon) return

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
        setPairsFound((prev) => prev + 1)
        setPairsRemaining((prev) => prev - 1)
        if (pairsRemaining === 1) {
          setGameWon(true)
        } else {
          newTurn()
        }
      } else {
        setTimeout(() => newTurn(), 2000)
      }
    }
  }, [firstCard, secondCard, cards, pairsRemaining])

  const newTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(turns + 1)
    setSelected(false)
    if (difficulty === 'challenging' && remainingTurns !== null) {
      setRemainingTurns((prev) => prev - 1)
      if (remainingTurns <= 1) {
        setGameOver(true)
      }
    }
  }

  useEffect(() => {
    let timer
    if (difficulty === 'normal' || difficulty === 'challenging') {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setGameOver(true)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 60000)
    }

    return () => clearInterval(timer)
  }, [difficulty])

  return (
    <div className="game">
      <div className="gamePanel">
        {difficultySelected && !gameOver && !gameWon && (
          <>
            <button onClick={shuffle}>Restart</button>
            <p>Turns: {turns}</p>
            <p>Pairs Found: {pairsFound}</p>
            <p>Pairs Remaining to Win: {pairsRemaining}</p>
          </>
        )}
        {(!difficultySelected || gameOver || gameWon) && (
          <Difficulties
            setDifficulty={(difficulty) => {
              setDifficulty(difficulty)
              setDifficultySelected(true)
              shuffle()
            }}
            setGameOver={setGameOver}
            setTurns={setTurns}
            shuffle={shuffle}
            setElapsedTime={setElapsedTime}
            setRemainingTime={setRemainingTime}
            setRemainingTurns={setRemainingTurns}
          />
        )}
        {!gameOver && difficulty === 'normal' && (
          <>
            <p>
              Elapsed Time: {elapsedTime} minutes, Remaining Time:{' '}
              {remainingTime} minutes
            </p>
          </>
        )}
        {!gameOver &&
          difficulty === 'challenging' &&
          remainingTurns !== null && (
            <>
              <p>
                Elapsed Time: {elapsedTime} minutes, Remaining Time:{' '}
                {remainingTime} minutes, Remaining Turns: {remainingTurns}
              </p>
            </>
          )}
      </div>
      {!gameOver && !gameWon ? (
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
      ) : gameWon ? (
        <>
          <h1 className="winMessage">Congratulations! You Won!</h1>
        </>
      ) : (
        <>
          <p className="over">Game Over!</p>
          <Difficulties
            setDifficulty={(difficulty) => {
              setDifficulty(difficulty)
              setDifficultySelected(true)
              shuffle()
            }}
            setGameOver={setGameOver}
            setTurns={setTurns}
            shuffle={shuffle}
            setElapsedTime={setElapsedTime}
            setRemainingTime={setRemainingTime}
            setRemainingTurns={setRemainingTurns}
          />
        </>
      )}
    </div>
  )
}

export default Game
