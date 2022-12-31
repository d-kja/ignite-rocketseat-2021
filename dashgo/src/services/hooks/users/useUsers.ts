import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../../api"

export type User = {
  id: string
  name: string
  email: string
  createAt: string
}

type UserResponse = Omit<User, "createAt"> & { create_at: string }

export type getUsersResponse = {
  users: User[]
  totalCount: number
}

type getUsersRequest = { page?: number }
type useUsersProps = {
  page?: number
  options?: UseQueryOptions<any>
}

export function useUsers({ page = 1, options = {} }: useUsersProps) {
  return useQuery<getUsersResponse>(["users", page], () => getUsers({ page }), {
    staleTime: 1000 * 60 * 10, // 5 seconds
    ...options,
  })
}

export const getUsers = async ({
  page = 1,
}: getUsersRequest): Promise<getUsersResponse> => {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  })

  const totalCount = Number(headers["x-total-count"])
  const users = data.users.map((user: UserResponse) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createAt: new Date(user.create_at).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }))

  return { users, totalCount }
}
