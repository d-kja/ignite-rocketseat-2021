import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react"

import { TableItemProps } from "../components/TransactionTable/TableItem"
import { api } from "../services/api"

interface TransactionsContextProps {
  transactions: TableItemProps[]
  handleUpdateTransactionsArray: (
    data: TableItemProps
  ) => void
}

export const TransactionsContext = createContext(
  {} as TransactionsContextProps
)

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<
    TableItemProps[]
  >([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await api.get("/transactions")
      if (response.data)
        setTransactions(response.data?.transactions)
    }

    fetchTransactions()
  }, [])

  const handleUpdateTransactionsArray = (
    data: TableItemProps
  ) => {
    setTransactions((prev) => [...prev, data])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        handleUpdateTransactionsArray,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
