import React, { useState, useEffect } from 'react'

const Difficulties = ({
  setDifficulty,
  setGameOver,
  setTurns,
  setCards,
  shuffle
}) => {
  const [difficulty, setLocalDifficulty] = useState('easy')
  const [timer, setTimer] = useState(null)
  const [remainingTurns, setRemainingTurns] = useState(null)

  useEffect(() => {
    if (difficulty === 'normal') {
      startTimer()
    } else if (difficulty === 'challenging') {
      setRemainingTurns(20)
    } else {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [difficulty])

  const startTimer = () => {
    const newTimer = setInterval(() => {}, 1000)
    setTimer(newTimer)
  }

  const stopTimer = () => {
    clearInterval(timer)
    setTimer(null)
  }

  const handleDifficultyChange = (diff) => {
    setLocalDifficulty(diff)
    setDifficulty(diff)
    setGameOver(false)
    setTurns(0)
    shuffle()
    if (diff === 'challenging') {
      setRemainingTurns(20)
    } else {
      setRemainingTurns(null)
    }
    stopTimer()
  }

  useEffect(() => {
    if (
      difficulty === 'challenging' &&
      remainingTurns !== null &&
      remainingTurns <= 0
    ) {
      setGameOver(true)
    }
  }, [remainingTurns, difficulty])

  return (
    <div className="difficulties">
      <button onClick={() => handleDifficultyChange('easy')}>Easy</button>
      <button onClick={() => handleDifficultyChange('normal')}>Normal</button>
      <button onClick={() => handleDifficultyChange('challenging')}>
        Challenging
      </button>
    </div>
  )
}

export default Difficulties
