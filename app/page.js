import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
Welcome to my first page
<Link href="/login">Login</Link>
<Link href="/signup">Sign up</Link>
    </main>
  )
}
