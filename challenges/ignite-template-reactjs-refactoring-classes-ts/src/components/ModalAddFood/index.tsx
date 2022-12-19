import { Ref } from "react"

// Components
import Modal from "../Modal"
import Input from "../Input"

// Styling
import { FiCheckSquare } from "react-icons/fi"
import { Form } from "./styles"

// types
import { TFood } from "../../types/TFood"

export interface ModalAddFoodProps {
  formRef?: Ref<any> // ???
  handleAddFood: (data: TFood) => void
  setIsOpen: () => void
  isOpen: boolean
}

function ModalAddFood({
  formRef,
  handleAddFood,
  setIsOpen,
  isOpen,
}: ModalAddFoodProps) {
  const handleSubmit = async (data: TFood) => {
    handleAddFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
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
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
