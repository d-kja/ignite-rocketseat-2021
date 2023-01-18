import { FormEvent, useCallback, useState } from "react"
import { ProductList } from "../../components/Products"
import { useMutation } from "@tanstack/react-query"
import { priceFormatter } from "../../utils/formatter"

type Product = {
  id: string
  name: string
  price: string
  priceFormatted: string
}

type ProductsRequest = { products: Array<Product>; totalPrice: number }

const handleProductSearch = async (
  query: string
): Promise<ProductsRequest | undefined> => {
  if (!query.trim()) {
    return
  }

  const response = await fetch(`http://localhost:3000/products?q=${query}`)
  const data: Product[] = await response.json()

  const products = data.map((product) => ({
    ...product,
    priceFormatted: priceFormatter.format(Number(product.price)),
  }))

  const totalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price)
  }, 0)

  return {
    products,
    totalPrice,
  }
}

function Home() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<ProductsRequest>({
    products: [],
    totalPrice: 0,
  })
  const { mutateAsync: searchProductsMutation, isLoading } = useMutation(
    (search: string) => handleProductSearch(search),
    {
      onSuccess: () => {
        setSearch("")
      },
    }
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const searchResult = await searchProductsMutation(search)

    if (searchResult) {
      setProducts(searchResult)
    }
  }

  /**
   * useCallback is mostly used to avoid recreating a new reference to the function
   *
   * Every time the Home component re-renders it also recreates this function, and as
   * we are using prop drilling to repass the function to the child component that
   * component is also going to re-render because the PROP/function changed the reference
   * in the memory.
   *
   * TLDR; useCallback is used to prevent re-renders caused by prop drilling
   */
  const handleAddToWishlist = useCallback(
    async (productId: string) => {
      console.log(productId)
    },
    [] // I don't have any dependencies and I don't rely on any state or calculation either, so no need for dependency here
  )

  return (
    <section
      title="Container"
      className="px-4 py-6 min-h-screen flex flex-col items-center gap-8"
    >
      <form className="input-group w-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-primary"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          type="submit"
          className={`btn btn-primary ${isLoading && "loading"}`}
        >
          {isLoading ? "Loading" : "Search"}
        </button>
      </form>
      <ProductList
        products={products.products}
        totalPrice={products.totalPrice}
        onAddToWishlist={handleAddToWishlist}
      />
    </section>
  )
}

export default Home
