import { Router } from 'express'
const transactionRouter = Router()

transactionRouter.get('/', (req, res, next) => {
    res.send('Hello World!')
})

export default transactionRouter;