import express, { Application } from "express";
import router from './routes/index'
import 'dotenv/config'
import cors from 'cors'
import { middleware } from "./middleware/cacheMiddleware";

const app: Application = express()
const port = process.env.PORT || 3666;
// const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(middleware)

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));
app.use('/api',router)

const server = app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	})

export default server