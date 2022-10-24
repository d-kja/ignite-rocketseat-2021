import { useContext } from "react"
import { TransactionsContext } from "../context/TransactionsContext"

export const useTransaction = () => {
  const context = useContext(TransactionsContext)

  return context
}
