import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db";
import { getServerAuthSession } from "../../server/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerAuthSession({ req, res });

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const id = session.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            accounts: true,
        }
    })

    const accessToken = user?.accounts[0]?.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: "Delete and Create a New Account" });
    }

    return res.status(200).json({ accessToken });
}