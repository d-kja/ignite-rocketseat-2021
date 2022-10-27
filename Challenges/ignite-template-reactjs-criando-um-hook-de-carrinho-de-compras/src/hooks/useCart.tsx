import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { Product, Stock } from "../types"

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({
    productId,
    amount,
  }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>(
  {} as CartContextData
)

export function CartProvider({
  children,
}: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem(
      "@RocketShoes:cart"
    )

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  // useEffect(() => {
  //   const cartJson = JSON.stringify(cart)
  //   localStorage.setItem("@RocketShoes:cart", cartJson)
  // }, [cart])

  const addProduct = async (productId: number) => {
    try {
      const newCart = [...cart]
      const productExists = newCart.find(
        (item) => item.id === productId
      )

      // Api requests
      const { data: stock } = (await api.get(
        `http://localhost:3333/stock/${productId}`
      )) as { data: Stock }
      const productResponse = (await api.get(
        `http://localhost:3333/products/${productId}`
      )) as { data: Product }

      const stockAmount = stock.amount
      const currentAmount = productExists
        ? productExists.amount
        : 0
      const amount = currentAmount + 1

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque")
        return
      }

      if (productExists) {
        productExists.amount = amount
      } else {
        const newProduct = {
          ...productResponse.data,
          amount: 1,
        }

        newCart.push(newProduct)
      }

      setCart(newCart)
      localStorage.setItem(
        "@RocketShoes:cart",
        JSON.stringify(newCart)
      )
    } catch (error: any) {
      toast.error("Erro na adição do produto")
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const newCart = [...cart]
      const productFound = newCart.find(
        (product) => product.id === productId
      )

      if (productFound) {
        newCart.filter(
          (product) => product.id !== productFound.id
        )

        setCart(newCart)
        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify(cart)
        )
      } else throw new Error()
    } catch (error: any) {
      toast.error("Erro na remoção do produto")
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const newCart = [...cart]
      const productFound = newCart.find(
        (product) => product.id === productId
      )

      const stockResponse = await api.get(
        `/stock/${productId}`
      )
      const stock: Stock = stockResponse.data
      const stockAmount = stock.amount

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque")
        return
      }

      if (amount < 1) throw new Error()

      if (productFound) {
        productFound.amount = amount

        setCart(newCart)
        const cartJson = JSON.stringify(newCart)
        localStorage.setItem("@RocketShoes:cart", cartJson)
      } else throw new Error()
    } catch {
      toast.error(
        "Erro na alteração de quantidade do produto"
      )
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
