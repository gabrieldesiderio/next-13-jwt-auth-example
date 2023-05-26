'use client'

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { headers } from "next/dist/client/components/headers";

type User = {
  name: string
  email: string
  avatarUrl: string
}


interface SignInData {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null,
  signIn: (data: SignInData) => Promise<void>
  refreshToken: () => Promise<void>
}

export const AuthContent = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: ReactNode} ) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'jwtest.token': token  } = parseCookies()

    if(token) {
      // make a request api to get user data

      setUser({
        name: 'Username',
        email: 'user@gmail.com',
        avatarUrl: 'https://github.com/useravatar.png'
      })
    }
  }, [])

  async function signIn({email, password}: SignInData) {
    const { data } = await api.post('/sessions', { email, password })

    setCookie(undefined, 'jwtest.token', data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`

    setUser({
      name: 'Username',
      email: 'user@gmail.com',
      avatarUrl: 'https://github.com/useravatar.png'
    })

    router.push('/dashboard')
  }

  async function refreshToken() {
    const response = await api.patch('/token/refresh');
    console.log(response);
  }

  return (
    <AuthContent.Provider value={{ isAuthenticated, user, signIn, refreshToken }}>
      {children}
    </AuthContent.Provider>
  )
}