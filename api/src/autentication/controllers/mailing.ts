var nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'altabirra.2021@gmail.com', // generated ethereal user
        pass: 'dnobhvwrqkcdnbca', // generated ethereal password
    },   
});

transporter.verify()
.then( () => {
    console.log('Ready for send emails')
})


export const emailRegistracion = (email:string, subject:string, usuarioHash:string) => {
    try{
        transporter.sendMail({
        from: '"AltaBirra Administración 🍻" <altabirra.2021@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body
        html: `
        <div style=
            "background-color: #ccc;
            padding-top: 25px;
            padding-left: 25px;
            padding-right: 25px;
            padding-bottom: 10px;">
            
            <h1 style=
                "background-color: #F49E51;
                border-radius: 20px;
                padding: 10px; padding-left: 12px;
                width: fit-content;
                margin: 0px auto;">
                BIENVENIDO A ALTABIRRA !!! 🍻
            </h1>
            <br/>
            <h2>Por favor haga click en el siguiente enlace para completar el proceso de registración:</h2>
            <br/>
            <span style=
                "font-style: italic;
                font-weight: bold;
                font-size: 15px;">
                ENLACE ===> 
            </span>
            <span style=
                "border-radius: 20px;
                background-color: black;
                padding: 10px;
                font-size: 15px;" >
                <a
                style= "color: white;"
                href="https://localhost:3000/verificarUsuario/${usuarioHash}">
                    Click aquí para verificar cuenta
                </a>
            </span>
            
            <h3 style="margin-top: 100px; text-decoration: underline;">
                Atte. El equipo de AltaBirra. 🍻
            </h3>
        </div>
        `
        });
    } catch(error){
    console.log('Error al enviar el email');
    }
}


