import express from "express"
import { getLatestTransactionController, getMaxTransactionController } from "../controllers/transaction.controller"
import validateAsset from "../middlewares/validateAsset.middleware"
import { getLatestTransactionSchema, getMaxTransactionSchema } from "../schemas/transaction.schema"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send("This is the transaction route")
})

/**
   * @openapi
   * '/api/v1/transaction/latest-transaction/{contractAddress}/{walletAddress}':
   *  get:
   *     tags:
   *     - Latest Transaction
   *     summary: Get the latest transaction of a walltet address
   *     parameters:
   *         - name: contractAddress
   *           in: path
   *           description: contract address on which the transaction in done
   *           schema:
   *             required: true
   *             type: string
   *             default: "0xdac17f958d2ee523a2206206994597c13d831ec7"
   *         - name: walletAddress
   *           in: path
   *           description: Wallet address from which the transaction in done
   *           schema:
   *             required: true
   *             type: string
   *             default: "0xae39b8ea82fd56EA950da6eD25Ee604Aec15ae3c"
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *             schema:
   *                 type: object
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.get('/latest-transaction/:contractAddress/:walletAddress', validateAsset(getLatestTransactionSchema), getLatestTransactionController)

/**
   * @openapi
   * '/api/v1/transaction/max-transactions':
   *  post:
   *     tags:
   *     - Max Transaction
   *     summary: Get the wallet having maximum transactions
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *             type: object
   *             required:
   *             - contractAddress
   *             - walletAddress
   *             properties:
   *                 contractAddress:
   *                     type: string
   *                     default: "0xdac17f958d2ee523a2206206994597c13d831ec7"
   *                 walletAddress:
   *                     type: array
   *                     items:
   *                         type: string
   *                     default:
   *                         [
   *                         "0x9BeFd60020227bD840BbbEf837a6ebfa9317Ef2D",
   *                         "0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F",
   *                         "0xae39b8ea82fd56EA950da6eD25Ee604Aec15ae3c",
   *                         ]
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post('/max-transactions', validateAsset(getMaxTransactionSchema), getMaxTransactionController)


export default router