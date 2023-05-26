'use client'

import { AuthContent } from "@/context/useAuth"
import { useContext } from "react"

export function SignInForm() {
  const { signIn, refreshToken } = useContext(AuthContent)

  async function handleSignIn() {
    await signIn({
      email: 'user@gmail.com',
      password: '123456'
    })
  }

  async function handleRefresh() {
    await refreshToken();
  }

  return (
    <>
      <button onClick={handleSignIn}>
        Login
      </button>
      <button onClick={handleRefresh}>
        Refresh Token
      </button>
    </>
  )
}