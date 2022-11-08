import { NextFunction, Request, Response } from "express";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { LatestTransactionInput, MaxTransactionInput } from "../schemas/transaction.schema";
import { getLatestTransaction } from "../services/transaction.service";



export const getLatestTransactionController = async (req: Request<LatestTransactionInput>, res: Response, next: NextFunction) => {
    const { contractAddress, walletAddress } = req.params
    try {
        const LatestTransaction = await getLatestTransaction(contractAddress, walletAddress)
        if (LatestTransaction.length == 0) throwError(205, "No transactions to show")
        res.status(200).send(LatestTransaction[0]);
    } catch (error: any) {
        throwError(error.statusCode, `Error in Latest Txns: ${error.message}`)
    }

}

export const getMaxTransactionController = asyncWrap(async (req: Request<{}, {}, MaxTransactionInput>, res: Response, next: NextFunction) => {
    const { contractAddress, walletAddress } = req.body
    try {
        const promises: string[] = []
        for (const address of walletAddress) {
            const txns = await getLatestTransaction(contractAddress, address);
            promises.push(txns)
        }
        const data = await Promise.all(promises)
        let max = 0, index = -1;
        for (let i = 0; i < data.length; i++) {
            if (data[i].length > max) {
                max = data[i].length;
                index = i;
            }
        }
        res.status(201).send({ MaxTxns: walletAddress[index] });
    } catch (error: any) {
        throwError(502, `Error in Latest Txns: ${error.message}`)
    }

})