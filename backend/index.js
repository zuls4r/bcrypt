import express from 'express'
import cors from "cors"
import { authRouter } from './src/routes/auth.route.js'
import { userRouter } from './src/routes/user.route.js'


const app = express()
const port = 9000

app.use(cors())
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})