import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs"
import { faker } from "@faker-js/faker"

type User = {
  name: string
  email: string
  created_at: string
}

export function MakeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

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
      server.createList("user", 30)
    },

    routes() {
      this.namespace = "api"
      // this.timing = 750 // milliseconds

      this.get("/users", function (schema, request) {
        const { per_page = 10, page = 1 } = request.queryParams
        console.log(per_page, page, "PARAMS")
        const total = schema.all("user").length
        const initialPage = (Number(page) - 1) * Number(per_page)
        const lastPage = initialPage + Number(per_page)

        const users = this.serialize(schema.all("user"))
          .users.sort((a, b) => b.create_at - a.create_at)
          .slice(initialPage, lastPage)
        console.log("bru", this.serialize(schema.all("user")))

        return new Response(
          200,
          {
            "x-total-count": String(total),
          },
          {
            users,
          }
        )
      }) // shorthand for `get("/users")`
      this.post("/users") // shorthand for `post("/users")`
      this.get("/users/:id") // shorthand for `post("/users")`

      this.namespace = ""
      this.passthrough() // allow API requests to pass through if no route matches
    },
  })

  return server
}

/*

*/
