'use client'

import { AuthContent } from "@/context/useAuth"
import { useContext } from "react"

export function UserData() {
  const { user } = useContext(AuthContent)

  return (
    <p>
      Current User: <br />
      Nome: {user?.name} <br />
      E-mail: {user?.email}
    </p>
  )
}