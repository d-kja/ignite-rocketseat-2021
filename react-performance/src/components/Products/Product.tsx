interface ProductProps {
  product: {
    id: string
    name: string
    price: string
  }
}

export const Product = ({ product }: ProductProps) => {
  return (
    <li className="flex max-w-sm w-full flex-shrink-0 flex-col gap-2 hover:bg-zinc-200 transition-colors px-4 py-6 rounded-md shadow-md drop-shadow-sm">
      <p>
        <span className="opacity-60">Name: </span>
        <span className="font-semibold">{product.name}</span>
      </p>
      <p>
        <span className="opacity-60">Price: </span>
        <span className="font-semibold">{product.price}</span>
      </p>
    </li>
  )
}
