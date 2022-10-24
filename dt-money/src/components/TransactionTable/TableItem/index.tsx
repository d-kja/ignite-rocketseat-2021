import {
  currencyFormatter,
  dateFormatter,
} from "../../../utils/useFormatter"

export interface TableItemProps {
  title: string
  value: string | number
  category: string
  createdAt: string
  type: "income" | "outcome"
}

export const TableItem = ({
  title,
  category,
  type,
  value,
  createdAt,
}: TableItemProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td className={type}>
        {type === "outcome" && "- "}
        {currencyFormatter.format(+value)}
      </td>
      <td>{category}</td>
      <td>{dateFormatter.format(new Date(createdAt))}</td>
      {/* new Date(createdAt).toLocaleDateString() */}
    </tr>
  )
}
