var nodemailer = require('nodemailer');
var fs = require('fs');

export const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ezequielaguilera1993@gmail.com', // generated ethereal user
        pass: 'yvpzgqwndpygfsxf', // generated ethereal password
    },
});

transporter.verify()
    .then(() => {
        console.log('Ready for send emails mailing')
    })


export const emailRegistracion = async (email: string, subject: string, usuarioHash: string, username: string) => {
    try {
        await transporter.sendMail({
            from: '"AltaBirra Administración 🍻" <ezequielaguilera1993@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
            html: await mailVerify(usuarioHash, username)
        });
    } catch (error) {
        console.log('Error al enviar el email');
    }
}


export const mailVerify = (userHash: string, usuario: string) => {
    let template =
        // `
        //     <h1>HOLAAAAAAAAAAAAA</h1>
        // `
        // `
        // <img src="https://i.imgur.com/aikAAiU.png" title="source: imgur.com" />
        // <h1>asdas</h1>
        // <svg width="311" height="69" viewBox="0 0 311 69" fill="none" xmlns="http://www.w3.org/2000/svg">

        // `
        `
        <div>            
            <div style=
            "background-image: repeating-linear-gradient(
                45deg,
                rgba(97, 97, 97, 0.1) 0px,
                rgba(97, 97, 97, 0.1) 2px,
                transparent 2px,
                transparent 4px
            ),
            linear-gradient(90deg, rgb(43, 43, 43), rgb(43, 43, 43));
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            height: 150px;
            margin-top: 0px;"
            >
                <section style=
                    "margin: 0px auto;
                    line-height: 150px;
                    text-align: center;"
                >
                    <img style=
                        "margin: 0px auto;
                        border-radius: 20px;
                        margin-top: 37px;
                        filter: invert(100%);"
                        src="https://i.imgur.com/aikAAiU.png" title="source: imgur.com" />
                </section>
                
            </div>
            
            <div>
                <section style=
                    "background-color: #ccc;
                    padding: 30px;
                    padding-left: 50px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;"
                >
                    <h2>Verifica tu correo electrónico</h2>
                    <h3>Hola ${usuario}, verifica tu cuenta para tener acceso a nuestro sitio y disfrutar de las mejores cervezas artesanales!</h3>
                    <h3>¡Haz click en el botón de abajo para unirte a la mayor comunidad cervecera!</h3><br/>
                    <span style=
                        "border-radius: 20px;
                        background-color: green;
                        color: black;
                        padding: 10px;
                        padding-left: 20px;
                        padding-right: 20px;
                        font-size: 15px;" >
                        <a
                            style= "color: white; text-decoration: none"
                            href="https://localhost:3000/verificarUsuario/${userHash}">
                                CONFIRMAR CORREO
                        </a>
                    </span>

                    <h3 style="margin-top: 100px; text-decoration: underline;">
                        Atte. El equipo de AltaBirra. 🍻
                    </h3>

                </section>
            </div>
        </div>
        `



    // `
    // <div style=
    //     "background-color: #ccc;
    //     padding-top: 25px;
    //     padding-left: 25px;
    //     padding-right: 25px;
    //     padding-bottom: 10px;">

    //     <h1 style=
    //         "background-color: #F49E51;
    //         border-radius: 20px;
    //         padding: 10px; padding-left: 12px;
    //         width: fit-content;
    //         margin: 0px auto;">
    //         BIENVENIDO A ALTABIRRA !!! 🍻
    //     </h1>
    //     <br/>
    //     <h2>Por favor haga click en el siguiente enlace para completar el proceso de registración:</h2>
    //     <br/>
    //     <span style=
    //         "font-style: italic;
    //         font-weight: bold;
    //         font-size: 15px;">
    //         ENLACE ===> 
    //     </span>
    // <span style=
    //     "border-radius: 20px;
    //     background-color: black;
    //     padding: 10px;
    //     font-size: 15px;" >
    //     <a
    //     style= "color: white;"
    //     href="https://localhost:3000/verificarUsuario/${userHash}">
    //         Click aquí para verificar cuenta
    //     </a>
    // </span>

    // <h3 style="margin-top: 100px; text-decoration: underline;">
    //     Atte. El equipo de AltaBirra. 🍻
    // </h3>
    // </div>
    // `

    return template;

}
