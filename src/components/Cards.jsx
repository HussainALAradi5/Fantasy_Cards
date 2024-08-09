const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.src} className="front" alt="card-front" />
      <img src="/img/cover.png" alt="card-back" className="back" />
      <div></div>
    </div>
  )
}

export default Card
