import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react"

import { TableItemProps } from "../components/TransactionTable/TableItem"
import { api } from "../services/api"

/** Omit<> or Pick<> */
export type Transaction = Omit<
  TableItemProps,
  "id" | "createdAt"
>
export type TransactionPost = {
  createdAt: Date
} & Transaction
interface TransactionsContextProps {
  transactions: TableItemProps[]
  handleUpdateTransactionsArray: (
    data: TransactionPost
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

  const handleUpdateTransactionsArray = async (
    data: TransactionPost
  ) => {
    const res = await api.post("/transactions", data)

    const newTransactions = res.data["transaction"]
    if (newTransactions)
      setTransactions((prev) => [...prev, newTransactions])
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
