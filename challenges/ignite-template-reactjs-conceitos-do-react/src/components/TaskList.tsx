import { useState } from "react"

// styling
import "../styles/tasklist.scss"

// icons
import { FiTrash, FiCheckSquare } from "react-icons/fi"

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  function handleCreateNewTask() {
    if (!newTaskTitle) return // não permita criar caso o título seja vazio

    const task: Task = {
      /**
       * Se o uuid nao fosse do tipo number podia ser usado:
       *  - crypto.randomUUID()
       *  - uuid()
       */
      id: Math.random(), // Crie uma nova task com um id random
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks((prev) => [...prev, task]) // adiciona o item no array
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks((prev) => {
      const restOfTheItems = prev.map((item) => {
        if (item.id === id)
          item.isComplete = !item.isComplete // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
        return item
      })

      return restOfTheItems
    })
  }

  function handleRemoveTask(id: number) {
    setTasks((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) =>
              setNewTaskTitle(e.target.value)
            }
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={
                  task.isComplete ? "completed" : ""
                }
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() =>
                      handleToggleTaskCompletion(task.id)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
