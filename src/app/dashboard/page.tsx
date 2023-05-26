import { UserData } from "@/components/UserData"

export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Protected route</h2>
      <UserData />
    </main>
  )
}
