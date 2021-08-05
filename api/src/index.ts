import app from './app';
import dotenv from "dotenv";

dotenv.config()
const PORT = 3001
app.listen(PORT, () => {
    console.log("Corriendo en puerto " + PORT);
})