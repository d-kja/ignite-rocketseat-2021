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
      if (response.data) setTransactions(response.data)
    }

    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
