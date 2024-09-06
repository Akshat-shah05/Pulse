import { getServerSession } from "next-auth";
import { db } from "../../../lib/db";
import Multiplayer from "@/components/multiplayer/Multiplayer";

const page = async () => {
  const user = await getServerSession();
    // Get the email, check if email exists
    let email = user?.user?.email;

    // if email exists, replace email with the associated username
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username;
    }

  return (
    <div>
      <Multiplayer username={email}/>
    </div>
  );
}

export default page