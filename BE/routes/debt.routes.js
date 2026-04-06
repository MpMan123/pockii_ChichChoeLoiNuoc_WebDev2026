import { Router } from 'express'
const debtRouter = Router();

debtRouter.get('/', (req, res, next) => {
    res.send('heloo');
})

export default debtRouter;