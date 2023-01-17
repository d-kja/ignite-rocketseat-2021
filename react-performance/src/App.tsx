import { FormEvent, useState } from "react"
import { ProductList } from "./components/Products"

type Product = {
  id: string
  name: string
  price: string
}

const handleProductSearch = async (
  query: string
): Promise<Array<Product> | undefined> => {
  if (!query.trim()) {
    return
  }

  const response = await fetch(`http://localhost:3000/products?q=${query}`)
  const data = await response.json()

  return data
}

function App() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const searchResult = await handleProductSearch(search)

    if (searchResult) {
      setProducts(searchResult)
    }
  }

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
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <ProductList products={products} />
    </section>
  )
}

export default App
