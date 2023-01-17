import { Product } from "./Product"

interface ProductListProps {
  products: Product[]
}

type Product = {
  id: string
  name: string
  price: string
}

export const ProductList = ({ products = [] }: ProductListProps) => {
  return (
    <ul
      aria-label="Product list"
      className="justify-center flex gap-2 flex-wrap"
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  )
}
