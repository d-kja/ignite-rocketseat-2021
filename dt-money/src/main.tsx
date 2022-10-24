import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

import { createServer, Model } from "miragejs"

const data = [
  {
    id: 1,
    title: "Website development",
    category: "Development",
    type: "income",
    value: 2000,
    createdAt: new Date("2022-08-21 09:00:00"),
  },
  {
    id: 2,
    title: "Software development",
    category: "Development",
    type: "outcome",
    value: 700,
    createdAt: new Date("2022-08-21 09:00:00"),
  },
]

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: data,
    })
  },
  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })
    this.post("/transactions", (schema, req) => {
      const reqData = JSON.parse(req.requestBody)
      return schema.create("transaction", reqData)
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
