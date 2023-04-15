import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import EncryptRSA from "encrypt-rsa"


const rsa = new EncryptRSA()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query
        console.log(id)

        const response = await prisma.message.findUnique({
            where: {
                id: id as string
            }
        })

        if (!response) {
            return res.status(404).json(response)
        }

        const { privateKey } = JSON.parse(process.env.PRIVATE_KEY as string)

        // console.log(privateKey)

        try {

            const realMessage = rsa.decryptStringWithRsaPrivateKey({
                text: response.message,
                privateKey: privateKey
            })

            // console.log(realMessage)
            return res.status(200).json({ realMessage })
            
        } catch (error) {
            return res.status(500).json({ message: "It can be caused an error at private key or the data " })
        }

    }
}