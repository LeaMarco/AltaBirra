// import axios from 'axios'

window.addEventListener('dfMessengerLoaded', (evento) => {

    const dfMessenger = document.querySelector('df-messenger');

    const arr = [];
    let recomendacion = fetch('http://localhost:3001/beer/premium')
        .then(puedeSerPa => puedeSerPa.json())
        .then(posts => posts.map(x => arr.push(x.id)))
        .catch(e => console.log("Aca hay algo que anda mal"))

    let p = async () => {
        return await fetch("http://localhost:3001/beer/premium").then(pa => pa.json()).catch(e => console.error(e))
    }


    console.log("la recomendacion:", recomendacion)
    Promise.all([p()]).then(x => x)

    dfMessenger.addEventListener('df-response-received', (evento) => {
        let resp = evento.detail.response.queryResult.fulfillmentText
        console.log('El bot respondio', resp)
        switch (resp) {
            case "Toma esta cerveza.": {
                fetch('http://localhost:3001/beer/premium')
                    .then(puedeSerPa => puedeSerPa.json())
                    .then(post => {
                        console.log(post[0])
                        dfMessenger.renderCustomCard(
                            [
                                {
                                    "accessibilityText": "Dialogflow across platforms",
                                    "rawUrl": post[0].image,
                                    "type": "image"
                                },
                                {
                                    "title": post[0].title,
                                    "actionLink": `http://localhost:3000/detailBeer/${post[0].id}`,
                                    "type": "info"
                                },
                                {
                                    "type": "accordion",
                                    "subtitle": "Mas información",
                                    "text": [
                                        `El Precio: $${post[0].countable.price} Cal: ${post[0].beer.calories} Descuento: %${post[0].countable.discount} Descripcion: ${post[0].description}`
                                    ]
                                }
                            ]
                        )
                    }).catch(e => console.log("Fallo la carga"))
                    break;
            }
            case "Lo siento, aun no estoy listo para responder eso.":{
                // dfMessenger.renderCustomText("Si tienes mas inquietudes puedes enviar un correo a: altabirra@gmail.com")
                fetch('http://localhost:3001/beer/premium')
                    .then(puedeSerPa => puedeSerPa.json())
                    .then(post => {
                        console.log(post[0])
                        dfMessenger.renderCustomCard(
                            [
                                {
                                    "title":"Puedes tomar una cerveza hasta que arreglemos la falla",
                                    "subtitle":"Puedes enviarnos un correo a: altabirra@gmail.com",
                                    "type":"info"
                                },
                                {
                                    "title": post[0].title,
                                    "actionLink": `http://localhost:3000/detailBeer/${post[0].id}`,
                                    "type": "info"
                                },
                                {
                                    "accessibilityText": "Dialogflow across platforms",
                                    "rawUrl": post[0].image,
                                    "type": "image"
                                },
                                {
                                    "type": "accordion",
                                    "subtitle": "Mas información",
                                    "text": [
                                        `El Precio: $${post[0].countable.price} Cal: ${post[0].beer.calories} Descuento: %${post[0].countable.discount} Descripcion: ${post[0].description}`
                                    ]
                                }
                            ]
                        )
                    }).catch(e => console.log("Fallo la carga"))
                break;
            }
        }
    });
    dfMessenger.addEventListener('df-user-input-entered', (event) => {
        let respuesta = event.detail.input;

        console.log('La respuesta del usuario es: ' + respuesta)

    });
});

