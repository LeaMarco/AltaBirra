import app from './app';
import dotenv from "dotenv";

dotenv.config()

console.log(process.env.SECRET_CODE);


app.listen(3001, () => {
    console.log("Corriendo en http://localhost:3001/");
})