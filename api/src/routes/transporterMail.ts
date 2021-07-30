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
        console.log('Ready for send emails transporterMail')
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
                    <h2>${usuario} gracias por tu compra!</h2>
                    <h3>Que disfrutes esta birren!</h3>
                    <h3>Volvé a elegir mas cervezas haciendo click en el siguiente enlace</h3><br/>
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
                            href="https://localhost:3000">
                                ¡IR A ALTABIRRA!
                        </a>
                    </span>

                    <h3 style="margin-top: 100px; text-decoration: underline;">
                        Atte. El equipo de AltaBirra. 🍻
                    </h3>

                </section>
            </div>
        </div>
        `

    return template;

}
