import { Router } from 'express'
const budgetRouter = Router()

budgetRouter.get('/', (req, res, next) => {
    res.send('heloo');
})

export default budgetRouter;