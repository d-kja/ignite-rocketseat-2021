import { useState, useEffect } from "react"

// Utils
import api from "../../services/api"

// COmponents
import Header from "../../components/Header"
import Food from "../../components/Food"
import ModalAddFood from "../../components/ModalAddFood"
import ModalEditFood from "../../components/ModalEditFood"

// Styling
import { FoodsContainer } from "./styles"

// Types
import { TFood } from "../../types/TFood"

export const Dashboard = () => {
  const [foods, setFoods] = useState<TFood[]>([])
  const [editingFood, setEditingFood] = useState<TFood>(
    {} as TFood
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] =
    useState<boolean>(false)

  useEffect(() => {
    const updateFoods = async () => {
      const response = await api.get("/foods")
      setFoods(response.data)
    }

    updateFoods()

    return () => {}
  }, [])

  const handleAddFood = async (food: TFood) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: TFood) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food }
      )

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(
      (food) => food.id !== id
    )

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen((prev) => !prev)
  }

  const toggleEditModal = () => {
    setEditModalOpen((prev) => !prev)
  }

  const handleEditFood = (food: TFood) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
