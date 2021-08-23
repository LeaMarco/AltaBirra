import axios from "axios"


export default async (amount) => {

    let CERVEZAS_ROJAS = [

        "https://http2.mlstatic.com/cerveza-artesanal-barba-roja-diabla-pale-ale-330ml-x12und-D_Q_NP_800431-MLA43419606683_092020-F.webp",
        "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/212/971/products/cerveza-me-echo-la-burra-roja1-a47c8efa4f35d1518015951086609909-640-0.jpg",
        "https://almacoop.com.ar/wp-content/uploads/2019/05/WhatsApp-Image-2020-04-23-at-16.43.171.jpeg",
        "https://http2.mlstatic.com/D_NQ_NP_690500-MLA44377639610_122020-O.jpg",
        "https://i.pinimg.com/474x/06/0b/5a/060b5a631c7409459f7b0e029872c725.jpg",

        "https://www.cervezaantares.com/storage/app/uploads/public/5ba/14f/575/5ba14f5753a4e664200820.png",
        "https://i.pinimg.com/originals/9d/55/ec/9d55ec3f79262f9d08f69374450393a5.jpg",
        "https://d2r9epyceweg5n.cloudfront.net/stores/001/436/994/products/cerveza-roja1-051f1bd8b6e91e947016086537437128-1024-1024.jpg",
        "https://tupicada.com.ar/wp-content/uploads/2020/05/scottish.jpg",
        "https://labarriadacooperativa.com.ar/wp-content/uploads/2020/10/WhatsApp-Image-2020-10-05-at-12.52.56.jpeg",
    ]

    let CERVEZAS_RUBIAS = [
        "https://res.cloudinary.com/abillionveg/image/upload/v1618943219/rusmsjivpxafiytywoyr.jpg",
        "https://walmartar.vteximg.com.br/arquivos/ids/850615-1000-1000/Cerveza-Rubia-Ipa-Imperial-500-Cc-1-461315.jpg?v637062525417530000",
        "https://http2.mlstatic.com/D_NQ_NP_701883-MLA43174035896_082020-O.jpg",
        "https://www.disanjo.com.uy/imagenes/img_contenido/producto/a/es/555555-03.png",
        "https://www.barragrau.pe/wp-content/uploads/2015/05/rubias-300x300.jpg",

        "https://mms.businesswire.com/media/20191204005216/es/760413/5/WW-La-Rubia-12oz-bottle-6-pack-plus-1-3D-layered-102919.jpg",
        "http://4.bp.blogspot.com/-mjO2LSepfvs/VRGugOUmHII/AAAAAAAAHlY/omrj-CAf0aw/s1600/f1219-califa-rubia-p.jpg",
        "https://vgb.com.ar/tienda/wp-content/uploads/2020/05/Brunnen-Lager-Bier-Cerveza-Artesanal-Rubia-365-cc-2.jpg?v1620308524",
        "https://espumadecerveza.es/wp-content/uploads/2016/08/karl-strauss-mosaic-session-ale-set.jpg",
        "http://cdn.shopify.com/s/files/1/0895/3560/products/Blonde_Can_Rebrand_4x_6c8e3b4a-28bf-4dd5-98aa-04750e041339_1024x.png?v=1606856086",
        "https://sentipatagonia.com.ar/wp-content/uploads/2020/09/PHOTO-2020-08-21-13-12-57.jpg",
    ]
    let CERVEZAS_NEGRAS = [
        "https://i.pinimg.com/originals/94/ec/67/94ec673d1ddf034dd3dffbf7057fbb33.jpg",
        "https://almacoop.com.ar/wp-content/uploads/2019/05/WhatsApp-Image-2020-04-23-at-16.43.18-324x324.jpeg",
        "https://www.jackmanstore.com/wp-content/uploads/2020/07/Cerveza-Artesanal-Tres-Codilleras-Negra-Bot-330ML-600x600.jpg",
        "https://imag.bonviveur.es/articulos/una-pinta-de-cerveza-guinness-reposando.jpg",
        "https://vgb.com.ar/tienda/wp-content/uploads/2020/05/Brunnen-Schwarz-Bier-Cerveza-Artesanal-Negra-365-cc-1.jpg?v1620308475",

        "https://http2.mlstatic.com/D_NQ_NP_777099-MLA43596516054_092020-O.jpg",
        "https://untappd.akamaized.net/photo/2019_10_03/f58af9e44f6f92a43f9154ce0936e6c9_c_812202473_640x640.jpg",
        "https://vgb.com.ar/tienda/wp-content/uploads/2020/04/Viejo-Munich-Bock-Cerveza-Artesanal-Negra-1.jpg?v1620309083",
        "https://sentipatagonia.com.ar/wp-content/uploads/2020/09/PHOTO-2020-08-21-13-21-24.jpg",
        "https://i.pinimg.com/originals/54/7d/9d/547d9dd53b6f5b71f41d2a6ef756d350.jpg",
    ]
    let beerName = ["Belgian ipa", "Scottish", "Brown Ale", "Red Ale", "Black Daniels", "Pshyco ipa", "Sweet Golden", "Wild Apa", "Wonca Golden", "American ipa", "Ipa argenta", "Raven Stout", "Shadow stout", "Old School Porter", "Sunshine Apa", "Dang River", "Earth Dock IPA", "Yamquak", "Bomb Session IPA", "Binglezard Flack", "Jain Is The Dog", "Earth 2 Sanebus", "Tower Of Ergelon", "Toe Deal", "Juicy Dripple IPA", "Flying Rocks IPA", "Yall In Wool", "Earth Pump", "Heaven Cat", "Heart Compost", "Wicked Geee", "Text 5 Of The IPA", "Cockamarin Hard IPA", "Test Tha IPA", "Yampy", "Aterid Ale", "The Great Rebelgion", "Trippel Lock", "Thick Back", "The Fraggerbar", "Dankering", "Third Maus", "Sip’s The Stunks Belgian Tripel", "Slambertangeriss", "Third Danger", "Track Of The Wind", "Devil’s Chard", "Spore Of Gold", "The Actoompe", "Brother Panty Tripel", "The Oldumbrett’s Ring", "The Vunker The Finger", "Gunder Of Traz", "Cherry Cornester", "Strange Fast", "Drammnt", "Humple La Bobstore", "Aged Monkay Tripel", "Snarging Red", "Warmel Halce’s Ale", "Fire Pipe", "Blangelfest", "Stoodemfest", "La Cat Tas Oo Ma Ale", "Ole Blood Whisk", "Frog Trail Ale", "Ricias Donkey Brain", "Sacky Rover", "Gate Rooster", "Cramberhand", "O'Busty Irish Red", "Helusto’s Humpin’ Red", "The Hunty", "Red Death", "Hoppy Amber Ale", "Rivernillion Amber", "Leifstic Imperial Red", "Imperial Red Ale", "I The Moon", "The Bopberry Stout", "Cherry Coconut Mint Chocolate Stout", "Black Morning", "Sir Coffee", "Shock State", "Take Bean", "Single Horde", "Whata Stout", "Shany Lace", "Black Sink Stout", "Barrel Aged Chocolate", "Shump", "Vanilla Coffee Stout", "Avidberry", "Dark Thomblan", "Jrankers Java Stout", "Coconut Pamper", "Cherry Trout Stout", "Bold Oot Stout"]
    let gtype = ["Rubia", "Roja", "Negra",]
    let stype = ["Amber", "Vino de cebada", "Ale belga", "Ale escocesa", "Duvel", "Porter", "Alt", "Kölsch", "Trappist", "Flanders negra", "Especial", "Cerveza de trigo", "Cerveza blanca", "Pilsner", "Dortumunder", "Viena", "Munich", "Bock", "Rauchbier", "Schwarzbier", "Gueuze", "Faro", "Cerveza de fruta"]
    let usernames = ["TestUser", "TestPremium"]
    let dirs = ["La pampa 3245, CABA", "Misiones 434, Carapachay", "Cabildo 500, CABA", "Anchorena 1123, CABA", "Calle Falsa 123, Springfield"]

    for (let i = 0; i < amount; i++) {

        let beer = {
            "abv": 2 + Math.floor(Math.random() * 15),
            "og": Math.floor(Math.random() * 200),
            "ibu": 15 + Math.floor(Math.random() * 80),
            "calories": 110 + Math.floor(Math.random() * 70),
            "dryHop": Math.random() > 0.5 ? true : false,
            "volume": 500,
            "genericType": gtype[Math.floor(Math.random() * (gtype.length))],
            "specificType": stype[Math.floor(Math.random() * (stype.length))],
        }

        let infoPost = {
            "title": beerName[Math.floor(Math.random() * (beerName.length))],
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolores ut consectetur nostrum doloremque numquam labore voluptate quos consequatur enim architecto, laboriosam hic quasi provident cumque reprehenderit aspernatur reiciendis ullam?",
            "image": beer.genericType === "Rubia" ? CERVEZAS_RUBIAS[Math.floor(Math.random() * (CERVEZAS_RUBIAS.length))] : beer.genericType === "Negra" ? CERVEZAS_NEGRAS[Math.floor(Math.random() * (CERVEZAS_NEGRAS.length))] : CERVEZAS_ROJAS[Math.floor(Math.random() * (CERVEZAS_ROJAS.length))],
            "pickupdir": dirs[Math.floor(Math.random() * dirs.length)],
            "rating": Math.ceil(Math.random() * 5),
            "stock": Math.floor(Math.random() * 50),
            "shipping": Math.random() > 0.5 ? true : false,
            "visibility": true,
            "username": usernames[Math.floor(Math.random() * usernames.length)]
        }
        let countable = {
            "price": (+(Math.random() * 200 + 75).toFixed(2)),
            "discount": Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 25),
            "expireDate" : "2021-07-29 12:52:01.428"
        }

        let infoToPost = { beer, infoPost, countable }

        await axios.post(`${process.env.REACT_APP_HOST_BACKEND}/AUTOPOST_ONLY_DEVELOPMENT_ROUTE`, { params: infoToPost })


    } return (`TERMINE`)

}

//////import CreateManyPost from "./postCreator";

/////INVOCARLA DONDE LA QUIERAN USAR CON <button onClick={()=>CreateManyPost(CANTIDAD DE POST QUE QUIERAN)}> CREAR</button> //maquina Lean