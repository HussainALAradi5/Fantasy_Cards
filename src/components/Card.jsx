const Card = ({ card, handleCard, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleCard(card)
    }
  }
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className="front" alt="card-front" />
        <img
          src="/img/cover.png"
          onClick={handleClick}
          alt="card-back"
          className="back"
        />
      </div>
    </div>
  )
}

export default Card
