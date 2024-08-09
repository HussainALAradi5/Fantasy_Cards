const Card = ({ card, handleCard, flipped }) => {
  const handleClick = () => {
    handleCard(card)
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
