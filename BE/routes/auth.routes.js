import { Router } from 'express'
const authRouter = Router();

authRouter.get('/', (req, res, next) => {
  res.send('hello word');
});

authRouter.post('/register', (req, res, next) => {
  res.json({
    name: req.body.name,
    age: req.body.age,
  })
});

authRouter.post('/login', (req, res, next) => {
  res.send('login');
});


export default authRouter;
