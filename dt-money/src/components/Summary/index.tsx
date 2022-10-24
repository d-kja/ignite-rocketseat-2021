import { Container } from "./styles"

import IncomeSVG from "../../assets/income.svg"
import OutcomeSVG from "../../assets/outcome.svg"
import TotalSVG from "../../assets/total.svg"
import { currencyFormatter } from "../../utils/useFormatter"
import { useTransaction } from "../../hooks/useTransaction"

type TSummaryValues = {
  total: number
  income: number
  outcome: number
}

export const Summary = () => {
  const { transactions } = useTransaction()

  const { income, outcome } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income")
        acc.income += +transaction.value
      if (transaction.type === "outcome")
        acc.outcome -= +transaction.value

      return acc
    },
    {
      income: 0,
      outcome: 0,
    }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={IncomeSVG} alt="income" />
        </header>
        <strong>{currencyFormatter.format(income)}</strong>
      </div>

      <div>
        <header>
          <p>Outcome</p>
          <img src={OutcomeSVG} alt="outcome" />
        </header>
        <strong>{currencyFormatter.format(outcome)}</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={TotalSVG} alt="total" />
        </header>
        <strong>
          {currencyFormatter.format(income + outcome)}
        </strong>
      </div>
    </Container>
  )
}
