import { getMaxListeners } from "process"
var nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    //yvpzgqwndpygfsxf ezeaghu19093
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ezequielaguilera1993@gmail.com', // generated ethereal user
        pass: 'yvpzgqwndpygfsxf', // generated ethereal password
    },
});


// send mail with defined transport object
let info = transporter.sendMail({
    from: '"AltaBirra Administración 🍻" <ezequielaguilera1993@gmail.com>', // sender address
    to: "altabirra.2021@gmail.com", // list of receivers
    subject: "Registración AltaBirra ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    html: `
            <div style=" padding:20px; border-radius:40px" >

            <img width="100%" src="https://i.imgur.com/bB1JUaf.png" style="border-radius:40px" margin= > 
            
            
              
            <h1  >BIENVENID@💝</h1>
            
                         
                        <h3>Hace click en el enlace para verificar tu cuenta 🍻</h3>
                                
            
                        <a href="http://localhost:3000/verificarUsuario/"usuarioHash">~Verificar mi cuenta~</a>
                        <br/>
                        <br/>
                        El equipo de AltaBirra. 🍺
              
             
              </div>

        `
})