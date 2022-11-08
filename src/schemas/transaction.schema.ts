import { TypeOf, z } from "zod";


export const getLatestTransactionSchema = z.object({
    params: z.object({
        contractAddress: z.string({
            required_error: "Contract Address is Required"
        }),
        walletAddress: z.string({
            required_error: "Wallet Address is Required"
        })
    })

})

export const getMaxTransactionSchema = z.object({
    body: z.object({
        contractAddress: z.string({
            required_error: "Contract Address is Required"
        }),
        walletAddress: z.array(z.string(), { required_error: "At least one wallet address is required" })
    })

})


export type LatestTransactionInput = TypeOf<typeof getLatestTransactionSchema>['params']

export type MaxTransactionInput = TypeOf<typeof getMaxTransactionSchema>['body']

// bleh:z.array(z.string())
