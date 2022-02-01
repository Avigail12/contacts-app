import express from 'express';
import { router } from "./router.js";
import cors from 'cors'

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
