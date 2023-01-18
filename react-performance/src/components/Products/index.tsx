import { Product } from "./Product"

interface ProductListProps {
  products: Product[]
  totalPrice: number
  onAddToWishlist: (id: string) => void
}

type Product = {
  id: string
  name: string
  price: string
  priceFormatted: string
}

export const ProductList = ({
  products = [],
  totalPrice,
  onAddToWishlist,
}: ProductListProps) => {
  /** Q: Why not calculate the total here?
   *
   * Well, every time we re-render the variable is recalculated...
   * and that's not the best way to do things
   */
  // const totalPrice = useMemo(
  //   () => {
  //     return products.reduce((acc, product) => {
  //       return acc + Number(product.price)
  //     }, 0)
  //   },
  //   [products] // dependency array
  // )

  return (
    <>
      <span>Total price: {totalPrice}</span>
      <ul
        aria-label="Product list"
        className="justify-center flex gap-2 flex-wrap"
      >
        {products.map((product) => (
          <Product
            onAddToWishlist={onAddToWishlist}
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </>
  )
}
