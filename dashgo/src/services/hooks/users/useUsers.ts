import { useQuery } from "react-query"
import { api } from "../../api"

export type User = {
  id: string
  name: string
  email: string
  createAt: string
}

type getUsersResponse = {
  users: User[]
  totalCount: number
}

type getUsersRequest = { page: number }

export function useUsers({ page = 1 }) {
  return useQuery<getUsersResponse>(["users", page], () => getUsers({ page }), {
    staleTime: 1000 * 60 * 10, // 5 seconds
  })
}

const getUsers = async ({
  page,
}: getUsersRequest): Promise<getUsersResponse> => {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  })

  const totalCount = Number(headers["x-total-count"])

  const users = data.users.map((user: User) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createAt: new Date(user.createAt).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }))

  return { users, totalCount }
}
