"use client"

import { ComponentInstanceIcon, CursorArrowIcon } from "@radix-ui/react-icons"

export const Loading = () => {
  return (
    <section
      aria-label="loading container"
      className="h-screen w-full flex justify-center items-center text-primary"
    >
      <ComponentInstanceIcon
        width="60px"
        height="60px"
        className="animate-spin"
      />
      <CursorArrowIcon
        width="16px"
        height="16px"
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-randomly-move"
      />
    </section>
  )
}
