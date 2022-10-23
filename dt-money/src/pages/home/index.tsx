import { Header } from "../../components/Header"
import { Dashboard } from "../../components/Dashboard"

import * as Dialog from "@radix-ui/react-dialog"
import {
  DialogClose,
  DialogContent,
  DialogForm,
  DialogInput,
  DialogOverlay,
  DialogTitle,
} from "./styles"
import { X } from "phosphor-react"

export function Home() {
  return (
    <Dialog.Root>
      <Header />
      <Dashboard />
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose children={<X />} />
          <DialogTitle>Register transaction</DialogTitle>
          <DialogForm>
            <DialogInput type="text" placeholder="name" />
            <DialogInput
              type="number"
              placeholder="price"
            />
            <DialogInput type="text" placeholder="..." />
            <DialogInput
              type="text"
              placeholder="category"
            />
          </DialogForm>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
