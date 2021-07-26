import app from './src/app';


app.listen(process.env.PORT, () => {
    console.log("Corriendo en https://altabirra.herokuapp.com/");
})