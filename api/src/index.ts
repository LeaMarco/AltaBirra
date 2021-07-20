import app from './app';
import dotenv from "dotenv";

dotenv.config()

app.listen(3001, () => {
    console.log("Corriendo en https://localhost:3001/");
})