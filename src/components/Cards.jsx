const Card = ({ card, handleCard }) => {
  const handleClick = () => {
    handleCard(card)
  }
  return (
    <div className="card">
      <img src={card.src} className="front" alt="card-front" />
      <img
        src="/img/cover.png"
        onClick={handleClick}
        alt="card-back"
        className="back"
      />
    </div>
  )
}

export default Card
