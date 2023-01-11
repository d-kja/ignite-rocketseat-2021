"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuthContext } from "../contexts/AuthContext"
import { api } from "../services/api"
import { useCan } from "../hooks/useCan"
import { Can } from "../components/Can"
import Head from "next/head"

const Profile = () => {
  const router = useRouter()
  const { user = {}, isAuthenticated } = useAuthContext()
  const canUserSeeMetrics = useCan({ permissions: ["metrics.list"] })

  useEffect(() => {
    if (!isAuthenticated) router.push("/")

    api
      .get("/me")
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }, [])

  return (
    <section
      aria-label="profile"
      className="container h-screen flex flex-col gap-4 px-4 py-6"
    >
      <h1 className="font-bold text-lg opacity-75">User info</h1>

      <div
        aria-label="user data"
        className="bg-base-200 rounded-lg px-3 py-4 flex flex-col md:gap-4 gap-2 overflow-auto"
      >
        <div className="flex flex-col gap-1">
          <strong className="opacity-50">E-mail</strong>
          <p>{user?.email}</p>
        </div>

        <div className="flex flex-col gap-1">
          <strong className="opacity-50">Permissions</strong>
          <ul>
            {user?.permissions?.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <strong className="opacity-50">Roles</strong>
          <ul>
            {user?.roles?.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>

        <Can permissions={["metrics.list"]}>I can see metrics!</Can>
      </div>
    </section>
  )
}

export default Profile
