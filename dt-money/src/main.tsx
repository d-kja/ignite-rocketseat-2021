import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

import { createServer } from "miragejs"

const data = [
  {
    title: "Website development",
    category: "Development",
    type: "income",
    value: 2000,
    date: new Date(),
  },
  {
    title: "Software development",
    category: "Development",
    type: "outcome",
    value: 700,
    date: new Date(),
  },
]

createServer({
  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return data
    })
  },
})

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
