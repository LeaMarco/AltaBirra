const payloadWelcome=[
    {
        "type": "description",
        "title": "¡Hola! Mi nombre es Julio",
        "subTitle": " Acá estoy para lo que necesites, Te dejo una lista de las cosas que te puedo responder con claridad",
        "text": [
            " Acá estoy para lo que necesites, Te dejo una lista de las cosas que te puedo responder con claridad"
        ]
    },
    {
        "type": "accordion",
        "subtitle": "Ver información",
        "title": "Componentes de la pagina",
        "text": " Puedes ver todos los componentes con el comando \"ver componentes\" \n"
    },
    {
        "title": "Manejo de la página",
        "text": "Ya que es algo cansador de leer te lo resumo, Esta es una pagina donde puedes comprar y vender tus propias cervezas artesanales ",
        "type": "accordion",
        "subtitle": "Ver información"
    },
    {
        "text": "Los comandos estan echos para facilitar tu busqueda de información y para que \"Don.Julio\" Sea mucho mas preciso a la hora de responer te algo. Para verlos solo utiliza \"Ver Comandos\", esto te dara una lista de lo que puedes escribir.",
        "type": "accordion",
        "subtitle": "Ver información",
        "title": "Lista de comandos"
    },
    {
        "title": "Estoy en ...",
        "text": "Esto te permitira obtener la informacíon de el componente en donde te encuentras y facilitará el entendimiento de las tareas a realizar en dicho lugar de la pagina",
        "type": "accordion",
        "subtitle": "Ver información"
    }
];
const payloadComands = [
    {
        "type": "accordion",
        "title": "Ver Home",
        "text": "Te mostrara lo que puedes hacer en \"Home\""
    },
    {
        "type": "accordion",
        "title": "Ver Carrito",
        "text": "Te mostrara lo que puedes hacer en \"Carrito\""
    },
    {
        "type": "accordion",
        "title": "Ver Favoritos",
        "text": "Te mostrara lo que puedes hacer en \"Favoritos\""
    },
    {
        "type": "accordion",
        "title": "Ver Registrarme",
        "text": "Te mostrara como puedes llenar el formulario para \"Registrarte\""
    },
    {
        "type": "accordion",
        "title": "Ver Entrar",
        "text": "Te mostrara como puedes llenar el formulario para \"Entrar\"(Recuerda que para esto debes estar registrado previamente)"
    },
    {
        "type": "accordion",
        "title": "Ver Categorias",
        "text": "Te mostrara que puedes encontrarte en \"Categorias\", Donde puedes conocer un poco mas sobre los estilos de cervezas"
    },
    {
        "type": "accordion",
        "title": "Ver Buscador",
        "text": "Te mostrara lo que puedes hacer en \"Buscador\" junto con el filtrado y como puedes hacer de tus busquedas un poco mas eficientes"
    },
    {
        "type": "accordion",
        "title": "Ver Bar de Julio",
        "text": "Te mostrara lo que puedes hacer en \"El Bar de Julio\""
    },
    {
        "type": "accordion",
        "title": "Ver Panel",
        "text": "Te enviara a \"Panel de Usuario\""
    }
];
const payloadComponents = [
    {
        "type": "accordion",
        "title": "AltaBirra",
        "subtitle": "Para mas información click aquí",
        "text": "Alta Birra es una página web amigable, Donde puedes encontrar cervezas artesanales y comprarlas segun puntuacíones"
    },
    {
        "text": "El carrito es tu propia lista de productos que quieres comprar, donde puedes comprar todos los productos a la vez o quitar el producto que no desees comprar",
        "image": {
            "src": {
                "rawUrl": "https://example.com/images/logo.png"
            }
        },
        "subtitle": "Para mas información click aquí",
        "title": "Carrito",
        "type": "accordion"
    },
    {
        "type": "accordion",
        "subtitle": "Para mas información click aquí",
        "image": {
            "src": {
                "rawUrl": "https://example.com/images/logo.png"
            }
        },
        "title": "Loguearme",
        "text": "Puedes Registrarte dando click"
    },
    {
        "text": "Tienes mas oportunidades de encontrar la cerveza que quieres con el buscador arriba en la barra de busqueda",
        "title": "Buscador",
        "subtitle": "Para mas información click aquí",
        "image": {
            "src": {
                "rawUrl": "https://example.com/images/logo.png"
            }
        },
        "type": "accordion"
    },
    {
        "title": "Panel de usuario",
        "image": {
            "src": {
                "rawUrl": "https://example.com/images/logo.png"
            }
        },
        "subtitle": "Para mas información click aquí",
        "type": "accordion",
        "text": "En el Panel de usuario puedes tomar el control de tu cuenta con mucha mas facilidad, controlando desde ahí todas tus actividades"
    }
]

export default {
    payloadWelcome,
    payloadComands,
    payloadComponents
} ;