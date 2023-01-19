import { Product } from "./Product"
import { FixedSizeList as List, ListChildComponentProps } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

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

  const handleRowRendering = ({ index, style }: ListChildComponentProps) => {
    return (
      <div style={style}>
        <Product
          onAddToWishlist={onAddToWishlist}
          key={products[index].id}
          product={products[index]}
        />
      </div>
    )
  }

  return (
    <>
      <span>Total price: {totalPrice}</span>
      <AutoSizer aria-label="Product list" className="mr-auto">
        {({ height, width }) => {
          return (
            <List
              itemCount={products.length}
              itemSize={200}
              height={height - 150}
              width={width}
              overscanCount={3}
            >
              {handleRowRendering}
            </List>
          )
        }}
      </AutoSizer>
    </>
  )
}
