import { currencyFormatter } from "../../../utils/useFormatter"

export interface TableItemProps {
  title: string
  value: string | number
  category: string
  date: Date
  type: "income" | "outcome"
}

export const TableItem = ({
  title,
  category,
  type,
  value,
  date,
}: TableItemProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td className={type}>
        {type === "outcome" && "- "}
        {currencyFormatter.format(+value)}
      </td>
      <td>{category}</td>
      <td>{date.toLocaleDateString()}</td>
    </tr>
  )
}
