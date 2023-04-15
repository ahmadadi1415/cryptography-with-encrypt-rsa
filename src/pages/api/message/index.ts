import { NextApiRequest, NextApiResponse } from "next";
import EncryptRSA from "encrypt-rsa"
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const { message } = req.body

        const response = await prisma.message.create({
            data: {
                message: message
            }
        })

        return res.status(200).json(response)
    }

    if (req.method === "GET") {
        const response = await prisma.message.findMany()

        return res.status(200).json(response)
    }
}