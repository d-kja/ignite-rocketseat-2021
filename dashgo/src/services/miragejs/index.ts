import { createServer, Factory, Model } from "miragejs"
import { faker } from "@faker-js/faker"

type User = {
  name: string
  email: string
  created_at: string
}

export function MakeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.firstName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createAt() {
          return faker.date.recent(10)
        },
      }),
    },
    seeds(server) {
      server.createList("user", 10)
    },

    routes() {
      this.namespace = "api"
      this.timing = 750 // milliseconds

      this.get("/users") // shorthand for `get("/users")`
      this.post("/users") // shorthand for `post("/users")`

      this.namespace = ""
      this.passthrough() // allow API requests to pass through if no route matches
    },
  })

  return server
}

/*

*/
