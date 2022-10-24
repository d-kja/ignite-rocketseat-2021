import { useContext } from "react"
import { TransactionsContext } from "../../context/TransactionsContext"

import { Container } from "./styles"
import { TableItem } from "./TableItem"

export const TransactionTable = () => {
  const { transactions = [] } = useContext(
    TransactionsContext
  )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(
            ({ category, date, title, type, value }) => (
              <TableItem
                title={title}
                category={category}
                type={type}
                value={value}
                date={new Date(date)}
                key={crypto.randomUUID()}
              />
            )
          )}
        </tbody>
      </table>
    </Container>
  )
}
