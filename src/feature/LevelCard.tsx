type Card = {
  name: string,
  cards: number,
  img: string,
}

function CardComponent({ card }: { card: Card }) {
  return (
    <a href={`/levels/${card.name}`} className="flex flex-col items-center bg-white p-2 md:p-4 rounded-xl justify-between md:h-80 sm:h-50 sm:min-w-[11em] md:min-w-[18em] h-36 min-w-[7em] hover:scale-103 transition-transform duration-300 hover:shadow-lg">
      <img src={card.img} alt="Easy Level" className="h-20 max-w-[5.78em] sm:h-31 sm:max-w-[10em] md:h-50 md:max-w-[16em] rounded-xl "/>
      <div className="flex flex-col items-center">
        <div className="font-semibold md:text-lg">{card.name}</div>
        <div className="text-sm md:text-base">{card.cards} Cards</div>
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