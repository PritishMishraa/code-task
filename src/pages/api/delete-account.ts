import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../server/db";
import { getServerAuthSession } from "../../server/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerAuthSession({ req, res });

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const id = session.user.id;

    const deleteUser = await prisma.user.delete({
        where: {
            id: id,
        }
    })

    return res.status(200).json({ deleteUser });
}