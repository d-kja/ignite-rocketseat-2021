import { Header } from "../../components/Header"
import { Dashboard } from "../../components/Dashboard"
import { TransactionModal } from "../../components/TransactionModal"

import { Root as DialogRoot } from "@radix-ui/react-dialog"

export function Home() {
  return (
    <DialogRoot>
      <Header />
      <Dashboard />
      <TransactionModal />
    </DialogRoot>
  )
}
