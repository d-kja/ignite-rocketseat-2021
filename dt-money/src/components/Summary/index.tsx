import { useContext, useEffect, useState } from "react"
import { TransactionsContext } from "../../context/TransactionsContext"

import { Container } from "./styles"

import IncomeSVG from "../../assets/income.svg"
import OutcomeSVG from "../../assets/outcome.svg"
import TotalSVG from "../../assets/total.svg"
import { currencyFormatter } from "../../utils/useFormatter"

type TSummaryValues = {
  total: number
  income: number
  outcome: number
}

export const Summary = () => {
  const { transactions } = useContext(TransactionsContext)

  const [summaryValues, setSummaryValues] =
    useState<TSummaryValues>({
      total: 0,
      income: 0,
      outcome: 0,
    })
  const { total, income, outcome } = summaryValues

  useEffect(() => {
    let transactionsIncome = 0
    let transactionsOutcome = 0

    transactions.forEach((transaction) => {
      const transactionType = transaction["type"]
      const transactionValue = +transaction["value"] ?? 0

      if (transactionType === "income")
        transactionsIncome += transactionValue

      if (transactionType === "outcome")
        transactionsOutcome -= transactionValue
    })

    setSummaryValues({
      total: transactionsIncome + transactionsOutcome,
      income: transactionsIncome,
      outcome: transactionsOutcome,
    })
  }, [transactions])

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
        <strong>{currencyFormatter.format(total)}</strong>
      </div>
    </Container>
  )
}
