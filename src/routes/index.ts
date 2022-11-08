import express from "express"
import transactionRoutes from "./transaction.route"

const router = express.Router()

/**
  * @openapi
  * /api/v1/:
  *  get:
  *     tags:
  *     - Healthcheck
  *     description: Responds if the app is up and running
  *     responses:
  *       200:
  *         description: App is up and running
  */
router.get('/', (_, res) => res.status(200).send("Healthy"));


router.use('/transaction', transactionRoutes)


export default router