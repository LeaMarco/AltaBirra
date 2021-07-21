import app from './app';
import dotenv from "dotenv";

dotenv.config()

console.log(process.env)

app.listen(3001, () => {
    console.log("Corriendo en " + process.env.HOST_FRONT);
})