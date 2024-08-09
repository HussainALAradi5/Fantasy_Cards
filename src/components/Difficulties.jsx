import React, { useState, useEffect } from 'react'

const Difficulties = ({
  setDifficulty,
  setGameOver,
  setTurns,
  shuffle,
  setElapsedTime,
  setRemainingTime,
  setRemainingTurns
}) => {
  const [difficulty, setLocalDifficulty] = useState('easy')
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (difficulty === 'normal' || difficulty === 'challenging') {
      startTimer()
    } else {
      stopTimer()
    }

    return () => stopTimer()
  }, [difficulty])

  const startTimer = () => {
    if (timer) return

    const newTimer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1)
      if (difficulty === 'normal' || difficulty === 'challenging') {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(newTimer)
            setGameOver(true)
            return 0
          }
          return prevTime - 60
        })
      } else if (difficulty === 'challenging') {
        setRemainingTurns((prevTurns) => {
          if (prevTurns <= 0) {
            clearInterval(newTimer)
            setGameOver(true)
            return 0
          }
          return prevTurns
        })
      }
    }, 60000)
    setTimer(newTimer)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  const handleDifficultyChange = (diff) => {
    setLocalDifficulty(diff)
    setDifficulty(diff)
    setGameOver(false)
    setTurns(0)
    shuffle()
    if (diff === 'challenging') {
      setElapsedTime(0)
      setRemainingTime(3)
      setRemainingTurns(20)
    } else if (diff === 'normal') {
      setElapsedTime(0)
      setRemainingTime(3)
      setRemainingTurns(null)
    } else {
      setRemainingTurns(null)
      setRemainingTime(null)
    }
    stopTimer()
  }

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
