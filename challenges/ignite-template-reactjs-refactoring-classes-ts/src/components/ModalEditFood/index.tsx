import { Ref } from "react"

import { Form } from "./styles"
import Modal from "../Modal"
import Input from "../Input"

// Styling
import { FiCheckSquare } from "react-icons/fi"

// Types
import { TFood } from "../../types/TFood"

export interface ModalEditFoodProps {
  formRef?: Ref<any>
  setIsOpen: () => void
  isOpen: boolean
  handleUpdateFood: (data: TFood) => void
  editingFood: TFood
}

function ModalEditFood({
  formRef,
  handleUpdateFood,
  setIsOpen,
  editingFood,
  isOpen,
}: ModalEditFoodProps) {
  const handleSubmit = async (data: TFood) => {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
        />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button
          type="submit"
          data-testid="edit-food-button"
        >
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
