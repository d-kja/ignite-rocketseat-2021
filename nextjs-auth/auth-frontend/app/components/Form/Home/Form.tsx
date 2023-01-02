"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Input } from "../Input"
import { Button } from "../../Button"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"

type handleSubmitProps = {
  email: string
  password: string
}

const signInSchema = yup
  .object({
    email: yup.string().email("Invalid e-mail").required("E-mail is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

export const Form = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleSubmitProps>({
    resolver: yupResolver(signInSchema),
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [session] = useState(false)

  const handleSignIn: SubmitHandler<handleSubmitProps> = (data) => {
    console.log(data)
    router.push("/profile")
  }

  return !session ? (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="max-w-sm w-full flex flex-col gap-2 mx-auto"
    >
      <Input
        label="E-mail"
        className="input-primary"
        {...register("email")}
        error={errors.email}
      />
      <Input
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        {...register("password")}
        error={errors.password}
        className="input-primary"
        Icon={isPasswordVisible ? EyeOpenIcon : EyeClosedIcon}
        IconFunction={() => setIsPasswordVisible((prev) => !prev)}
      />

      <Button type="submit" className="btn-primary w-full mt-2">
        Sign In
      </Button>
    </form>
  ) : (
    <div className="mx-6 w-full">
      <Button type="button" className="btn-secondary w-full">
        Sign Out
      </Button>
    </div>
  )
}
