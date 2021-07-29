import axios from "axios"

const premium = axios.get('http://localhost:3001/beer/premium')
    .then(response => {
        response.data
        console.log(response)
    })
    .catch(error => console.error('No se pudieron obtener las cervezas premium'))


window.addEventListener('dfMessengerLoaded', (evento) => {




    const dfMessenger = document.querySelector('df-messenger'); // Elemento Bot

    const payloadEstoyEn = [
    ]
    // dfMessenger.renderCustomCard(payloadComandsVer)
    // dfMessenger.renderCustomCard(payloadComponents)
    let respuesta;
    console.log(respuesta)
    dfMessenger.addEventListener('df-user-input-entered', (evento) => {
        // respuesta = evento.detail.input;
        respuesta = evento.detail.input;
        console.log(premium)
        console.log(respuesta)
        switch (respuesta.toUpperCase()) {
            case "RECOMENDAME UNA CERVEZA JULIO": {
                dfMessenger.renderCustomText(`Mira, esta es la premium de la semana`)
            }
            case "COMANDOS DE \"ESTOY EN\"": {
                dfMessenger.renderCustomText("Proximamente comandos de \"Estoy en...\"")
                break;
            }
            case "COMANDOS DE ESTOY EN": {
                dfMessenger.renderCustomText("Proximamente comandos de \"Estoy en...\"")
                break;
            }
            case "COMANDOS DE \"DON JULIO\"": {
                dfMessenger.renderCustomText("Proximamente comandos de \"Don Julio...\"")
                break;
            }
            case "COMANDOS DE DON JULIO": {
                dfMessenger.renderCustomText("Proximamente comandos de \"Don Julio...\"")
                break;
            }
            // default: {
            //     dfMessenger.renderCustomText(`Lo siento no puedo responder a eso\n => \" ${respuesta} \" <= ¯\_(ツ)_/¯`)
            // }
        }
    })
});