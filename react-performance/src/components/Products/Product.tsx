import { Suspense, lazy, memo, startTransition, useState } from "react"

// NEXT WAY OF USING LAZY IMPORTS
// const ProductModal = dynamic(() => import("./ProductModal"))

// REACT WAY OF USING LAZY IMPORTS
const ProductModal = lazy(
  () => import("./ProductModal") //.then((mod) => mod.ProductModal) if it's export by default
)

// Lazy imports (just when it's needed) const { format } = await import('date-fns')

interface ProductProps {
  product: {
    id: string
    name: string
    price: string
    priceFormatted: string
  }
  onAddToWishlist: (id: string) => void
}

const ProductComponent = ({ product, onAddToWishlist }: ProductProps) => {
  const [openModal, setOpenModal] = useState(false)
  /** Q: Why not format it here?
   *
   * Well, every time we re-render the variable is updated/formatted...
   * and that's not the best way to do things
   */
  // const price = useMemo(
  //   () => priceFormatter.format(Number(product.price)),
  //   [product]
  // )

  return (
    <li className="flex max-w-sm w-full flex-shrink-0 flex-col gap-2 hover:bg-zinc-200 transition-colors px-4 py-6 rounded-md shadow-md drop-shadow-sm">
      <p>
        <span className="opacity-60">Name: </span>
        <span className="font-semibold">{product.name}</span>
      </p>
      <p>
        <span className="opacity-60">Price: </span>
        <span className="font-semibold">{product.priceFormatted}</span>
      </p>
      <button
        className="btn btn-block hover:opacity-80"
        onClick={() =>
          // start lazy transition
          startTransition(() => {
            setOpenModal(true)
          })
        }
      >
        Add to Wishlist
      </button>

      {openModal && (
        <Suspense
          fallback={
            <>
              <div className="fixed inset-0 bg-base-300/75">
                <button className="btn btn-square btn-ghost loading fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"></button>
              </div>
            </>
          }
        >
          <ProductModal
            onAddToWishlist={() => onAddToWishlist(product.id)}
            onRequestClose={() => setOpenModal(false)}
          />
        </Suspense>
      )}
    </li>
  )
}

export const Product = memo(ProductComponent, (previousProps, nextProps) => {
  return Object.is(previousProps.product, nextProps.product)
})
