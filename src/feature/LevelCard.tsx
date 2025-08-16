type Card = {
  name: string,
  cards: number,
  img: string,
}

function CardComponent({ card }: { card: Card }) {
  return (
    <a href={`/levels/${card.name}`} className="flex flex-col bg-white p-2 rounded-xl justify-between h-36 min-w-[6.78em]">
      <img src={card.img} alt="Easy Level" className="h-20 rounded-xl max-w-[5.78em]"/>
      <div className="flex flex-col items-center">
        <div className="font-semibold">{card.name}</div>
        <div className="text-sm">{card.cards} Cards</div>
      </div>
    </a>
  )
}

export function CardList({ list }: { list: Card[] }) {
  return (
    <>
      {list.map((card) => (
        <CardComponent key={card.name} card={card}/>
      ))}
    </>
  )
}