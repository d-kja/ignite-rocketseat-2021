import type { TransactionPost } from "../../context/TransactionsContext"

import { ChangeEvent, FormEvent, useState } from "react"
import { useTransaction } from "../../hooks/useTransaction"

import {
  DialogClose,
  DialogContent,
  DialogForm,
  DialogInput,
  DialogOverlay,
  DialogRadioButton,
  DialogRadioContainer,
  DialogTitle,
} from "./styles"
import { Portal as DialogPortal } from "@radix-ui/react-dialog"

import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { X } from "phosphor-react"

type TFormData = {
  title: string
  value: string
  category: string
}

export const TransactionModal = () => {
  const { handleUpdateTransactionsArray } = useTransaction()
  const [formData, setFormData] = useState<TFormData>({
    category: "",
    title: "",
    value: "",
  })
  const { category, title, value } = formData
  const [type, setType] = useState<"income" | "outcome">(
    "income"
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const data: TransactionPost = {
      type,
      ...formData,
      value: +formData.value,
      createdAt: new Date(),
    }

    handleUpdateTransactionsArray(data)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogClose children={<X />} />
        <DialogTitle>Register transaction</DialogTitle>
        <DialogForm onSubmit={handleSubmit}>
          <DialogInput
            required
            id="title"
            type="text"
            placeholder="name"
            onChange={handleChange}
            value={title}
          />
          <DialogInput
            required
            id="value"
            type="number"
            placeholder="price"
            onChange={handleChange}
            value={value}
          />

          <DialogRadioContainer>
            <DialogRadioButton
              type="button"
              onClick={() => setType("income")}
              isActive={type === "income"}
              activeColor="#33cc95"
            >
              <img src={incomeImg} alt="income" />
              <span>Income</span>
            </DialogRadioButton>

            <DialogRadioButton
              type="button"
              onClick={() => setType("outcome")}
              isActive={type === "outcome"}
              activeColor="#e62e40"
            >
              <img src={outcomeImg} alt="Outcome" />
              <span>Outcome</span>
            </DialogRadioButton>
          </DialogRadioContainer>

          <DialogInput
            required
            id="category"
            type="text"
            placeholder="category"
            onChange={handleChange}
            value={category}
          />

          <button type="submit">Register</button>
        </DialogForm>
      </DialogContent>
    </DialogPortal>
  )
}
