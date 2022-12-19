import { useState, useEffect } from "react"

import { ProductList } from "./styles"
import { api } from "../../services/api"
import { formatPrice } from "../../util/format"
import { useCart } from "../../hooks/useCart"
import { Product } from "../../components/Product"

interface Product {
  id: number
  title: string
  price: number
  image: string
}

export interface ProductFormatted extends Product {
  priceFormatted: string
}

interface CartItemsAmount {
  [key: number]: number
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<
    ProductFormatted[]
  >([])
  const { addProduct, cart } = useCart()

  const cartItemsAmount = cart.reduce(
    (sumAmount, product) => {
      sumAmount[product.id] =
        (sumAmount[product.id] ?? 0) + product.amount
      return sumAmount
    },
    {} as CartItemsAmount
  )

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products")

      if (data) {
        const productsFormatted: ProductFormatted[] = (
          data as ProductFormatted[]
        ).map((item) => {
          item.priceFormatted = formatPrice(+item.price)

          return item
        })

        setProducts(productsFormatted)
      }
    }

    loadProducts()
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      {products.map((product) => (
        <Product
          product={product}
          key={product.id}
          handleAddProduct={handleAddProduct}
          cartItemsAmount={cartItemsAmount}
        />
      ))}
    </ProductList>
  )
}

export default Home
