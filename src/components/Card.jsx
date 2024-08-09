const Card = ({ card, handleCard, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleCard(card)
    }
  }

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-face card-back"></div>
        <div className="card-face card-front">
          <img src={card.src} alt="card-front" />
        </div>
      </div>
    </div>
  )
}

export default Card
