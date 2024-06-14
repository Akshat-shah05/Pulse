
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST (req: NextApiRequest, res: NextApiResponse) {

    const { userId, incrementBy } = req.body;

    try {
        const updatedUser = await db.user.update({
          where: {
            id: userId,
          },
          data: {
            pushupsAllTime: {
              increment: incrementBy,
            },
          },
        });
    } catch(error) {
        res.status(500).json({ error: 'Error incrementing pushups' });
    }
}