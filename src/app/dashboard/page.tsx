import Dashboard from '@/components/dashboard/Dashboard'
import { getServerSession } from "next-auth"
import { db } from "@/lib/db"

const page = async () => {
    const user = await getServerSession()
    let email = user?.user?.email
    console.log(email)
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username
    }

  return (
    <>
        <Dashboard username={email}/>
    </>
  )
}

export default page