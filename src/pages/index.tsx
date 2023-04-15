import Head from 'next/head'
import { useEffect, useState } from 'react'
import EncryptRSA from 'encrypt-rsa'
import axios from 'axios'
import Link from 'next/link'


export default function Home() {

	const [message, setMessage] = useState("")
	const [submitting, setSubmitting] = useState(false)

	const encryptRSA = new EncryptRSA()

	const pubKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuyjfP9toOxWyHvwkBFEL
UMDCWUEMgJ0fJt0kG8IiZ8OYeG/e9Y7E8S8pJXqkBH8qAlkYn4YcpVtRV2XIg9I4
V2wcwTKPG/t+qjzIwIIXFwo95azNoP5XNlj0Qtk2hd0fBjvikvpR4H4G0Lppp21R
4Arr8F/fauKeDUGSxhIsQtMpcyYJAz5vEhNJ4xt5YupKr+jy4jBqoKFAipo9eF6W
liDYsmf5IAWrKKRqMFfkuOgqh2bhd7xqjuPxhqpUnLD4YG+sQGXmCLNSIFQ6rqQA
j1JXDNy7uWIw0Q7oslGVaZvCB5DPhew8xQT/NaUfdRy31KfNcNXf+vPoI3BRyZxQ
kwIDAQAB
-----END PUBLIC KEY-----`

	async function handleSubmit() {
		console.log(message)

		try {
			const encrypted = encryptRSA.encryptStringWithRsaPublicKey({
				text: message,
				publicKey: pubKey
			})

			setSubmitting(true)

			const response = await axios.post("/api/message", {
				message: encrypted,
			})

			console.log(encrypted)
			setMessage("")
			alert("Encryption successful!")
			setSubmitting(false)
		} catch (error: any) {
			console.log(error.message)
			alert(error.message)
			setSubmitting(false)
		}

	}

	useEffect(() => {
	  
	}, [submitting])
	

	return (
		<>
			<Head>
				<title>RSA Encryption</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<script></script>

			<main className="bg-gradient-to-r from-gray-800 to-orange-600 min-h-screen">
				<div className="container ">
					<div className="pt-20">
						<h1 className="text-5xl text-center font-mono">RSA ENCRYPTION</h1>
					</div>
					<div className="pt-6 mx-32">
						<p className="text-xl text-left pt-5 font-sans">What is it?</p>
					</div>
					<div className="py-3 mx-20">
						<div className='text-base text-left font-sans text-gray-50'>
							RSA encryption is a public-key cryptosystem that is widely used for secure data transmission. It is also one of the oldest. The acronym "RSA" comes from the surnames of Ron Rivest, Adi Shamir and Leonard Adleman, who publicly described the algorithm in 1977. RSA encryption works by using a pair of keys, a public key and a private key. The public key can be shared with anyone, while the private key must be kept secret. To encrypt a message, the sender uses the recipient's public key. To decrypt the message, the recipient uses their private key. RSA encryption is a very secure algorithm, and it is used in a wide variety of applications, including secure email, online banking, and digital signatures.
						</div>
					</div>
					<div className="text-center pt-10">
						<form onSubmit={e => {
							e.preventDefault()
							handleSubmit()
						}}>
							<div>
								<textarea
									className="rounded-xl mx-2 p-3 bg-white text-gray-700 w-96 shadow-lg h-24"
									value={message}
									onChange={e => {
										setMessage(e.target.value)
									}} />
							</div>

							<div className='mt-3'>
								<button className="shadow-lg focus: bg-gray-800 hover:bg-gray-900 rounded-xl p-3 px-6" type='submit' disabled={submitting}>{(!submitting) ? "Encrypt!" : "Encrypting..."}</button>
								<Link href={'/messages'} className='px-5'>
									Check all the messages
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	)

}
