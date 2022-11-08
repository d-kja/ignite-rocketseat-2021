import type { NextApiRequest, NextApiResponse } from "next"

const users = [
  {
    id: 1,
    name: "John doe",
  },
  {
    id: 2,
    name: "John smith",
  },
  {
    id: 3,
    name: "Nicolas",
  },
]

export default function UsersApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(users)
}
