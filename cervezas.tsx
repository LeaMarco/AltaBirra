

const http = require("http")

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world!')
});

server.listen(port, () => {
    console.log(`Server runing on port: ${port}`)
});








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
    "https://lh3.googleusercontent.com/proxy/VW2m6TE-sWn_T3go_Ux7Gi4fKayyOJJXVMz2mjiDF8ZUZRQ-Vd9ZHdgDFzucIHO-h_mMhazKKENFl1E6TUgXvy8foGsFOdZT5vdFX95J4BR-oSALXD1jv8dXB91pzfTA",
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
    "https://w7.pngwing.com/pngs/483/590/png-transparent-ale-stout-beer-kona-brewing-company-porter-beer-posters-beer-bottle-coffee-beer.png",
]
