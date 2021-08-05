import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/autentication/controllers/auth.controller";
import { add } from 'date-fns'

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  ///////////////COSAS PERMANENTES//////////////////
  // ROLES
  const user = await prisma.role.create({ data: { name: "USER" } });
  const admin = await prisma.role.create({ data: { name: "ADMIN" } });

  //USER-ADMIN
  await prisma.user.create({
    data: {
      username: "TestUser",
      email: "TestUser@email.com".toLowerCase(),
      name: "Test User",
      password: encryptPassword("password"),
      role: {
        connect: { id: user.id }
      },
      cart: {
        create: {}
      },
      favorite: {
        create: {}
      },
      views: {
        create: {}
      },
      userHash: 'asdasdasdas',
      verify: true
    },
  });

  await prisma.user.create({
    data: {
      username: "TestAdmin",
      email: "TestAdmin@email.com".toLowerCase(),
      name: "Test Admin",
      password: encryptPassword("password"),
      role: {
        connect: { id: admin.id }
      },
      cart: {
        create: {}
      },
      favorite: {
        create: {}
      },
      views: {
        create: {}
      },
      userHash: 'asd',
      verify: true
    },
  });

  await prisma.user.create({
    data: {
      username: "TestPremium",
      email: "TestPremium@email.com".toLowerCase(),
      name: "Test Premium",
      password: encryptPassword("password"),
      role: {
        connect: { id: admin.id }
      },
      cart: {
        create: {}
      },
      premium: true,
      favorite: {
        create: {}
      },
      views: {
        create: {}
      },
      userHash: 'asdddd',
      verify: true
    },
  });



  //TIPOS GENERICOS
  const rubia = await prisma.genericType.create({
    data: {
      type: "Rubia",
      description: `Es elaborada con maltas pálidas o claras. Este cereal debe ser horneado o cocido mediante el proceso de malteado, al hornearlo a bajas temperaturas y durante un corto tiempo, se obtienen maltas muy claras, y en su defecto poco tostadas, lo que dará lugar a una cerveza con el aspecto rubio y claro.`
    },
  });
  const roja = await prisma.genericType.create({
    data: {
      type: "Roja",
      description: `En su elaboración predominan la malta de cebada y su color rubí, y a diferencia de la cerveza negra, por ejemplo, casi no incluye lúpulo. Se suele distinguir por sus aromas frutales.`
    },
  });
  const negra = await prisma.genericType.create({
    data: {
      type: "Negra",
      description: `Para conseguir una cerveza negra y lograr esa oscuridad final hay que tener en cuenta que lo principal para estas es la utilización de maltas tostadas, oscuras.`
    },
  });

  //☢ Si les sacas las llaves a lo de abajo sos boleta ☢
  //FALTA PONER CUAL ES RUBIA Y TAL
  {// ALE O FERMENTACION RAPIDA ///////////////////////////////////////////////////////////////
    await prisma.specificType.create({
      data: {
        type: "Amber",
        description: `Es la denominación actual de la Ale y hace referencia al color. Ésta es la
designación de las cervezas especiales belgas y las ales americanas.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Vino de cebada",
        description: `Esta denominación se utiliza para las cervezas muy fuertes de fermentación
superior. El color puede variar de pajizo a oscuro. Las versiones más fuertes de
la ale inglesa reciben el nombre de vino de cebada.`,
        group: "ALE",
        genericType: { connect: { id: negra.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Ale belga",
        description: `La Ale belga es una réplica de ale inglesa, posee un carácter similar. La Ale
belga puede ser más especiada y enérgica. Los belgas denominan Ale a su
cerveza de color ámbar, de fermentación superior con bajo contenido de 
alcohol. Las Ales belgas son más adecuadas para el tapeo que la cerveza tipo
Pilsner.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Ale escocesa",
        description: `La Ale escocesa es una cerveza predominantemente redonda, de mucho
cuerpo, normalmente muy oscura, dulce y de sabor malteado y tostado.
Muchas de las ales escocesas son productos belgas.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Duvel",
        description: `La Duvel es una cerveza eminentemente belga, se denomina así por la primera
infusión realizada de este tipo, también se refiere a una fuerte cerveza belga de
paja.
La Duvel es una cerveza con un alto contenido alcohólico, de fermentación
superior y amarga. La cerveza de paja se degusta fría a temperatura ambiente
y debe su nombre a su contenido engañosamente fuerte.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Porter",
        description: `Cerveza de malta (seca/ dulce/ leche/ harina de avena/ imperial). La cerveza de
malta hace justicia a su nombre y posee un alto grado de tosquedad. Los tipos
existentes presentan un pronunciado color oscuro y sabor a malta tostada. Ya
sea en versión amarga, dulce o seca, la espuma de esta cerveza debe ser
siempre firme y cremosa.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Alt",
        description: `Altbier es la cerveza que en Alemania sobrevivió al cambio de la cerveza de
fermentación inferior, de ahí el nombre de alt (viejo). Estas cervezas son de
fermentación superior y experimentan una maduración en frío de entre tres y
ocho semanas. Suelen ser de color bronce oscuro, aunque también existan
versiones más claras. Es bastante suave, ligeramente amarga y con frecuencia
presentan un tono algo tostado. Se bebe fría y se localiza en la ciudad alemana
de Dusseldorf.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Kölsch",
        description: `La Kölsch es una cerveza de fermentación superior permanente vinculada a la
ciudad de Colonia, de la que recibe su nombre Kölsch que significa “de
Colonia”. Es una cerveza de paja, suave y ligera, pero con un considerable
contenido de dióxido de carbono. Su contenido alcohólico ronda en torno al 5%
(vol.) y puede elaborarse con una pequeña cantidad de malta de trigo. La
Kölsch es un tipo de cerveza protegido, con un contenido y un método de
elaboración bien definidos. Una de sus características son sus prioridades para
asentar el estómago.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Trappist",
        description: `No existen más que seis marcas en el mundo que pueden denominar a sus
cervezas Trappist. Son todas de fermentación superior, similares a las ales
belgas y a los vinos de cebada.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Flanders negra",
        description: `Es una especialidad belga de fermentación superior. De color marrón rojizo, su
maduración es de un año o más, mezclándose a continuación con una cerveza
más joven. Presenta un sabor ligeramente agridulce debido a su
envejecimiento en roble. Su contenido de alcohol ronda en torno al 5%.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Especial",
        description: `Muchas de las cervezas locales belgas no pueden clasificarse realmente en
clases independientes. Se incluyen bajo la denominación de ales belgas, pero
presentan grandes variaciones de una a otra.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Cerveza de trigo",
        description: `La cerveza de trigo es el tipo belga especiado, elaborada con trigo sin malta,
aditivos de especias y cáscaras de naranja. Es una bebida turbia de sabor
ligeramente amargo y especiado. La variante alemana se elabora con trigo
malteado y no incluye aditivos. Algunas versiones contienen levadura y son
turbias, existen las versiones filtradas y, por lo tanto, transparentes (Kristall).
Las cervezas de trigo no tienen por que ser de paja, son frescas y ligeramente
agrias.`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Cerveza blanca",
        description: `La cerveza blanca es igual que la cerveza de trigo. Existen algunas versiones
alemanas que denominan “cerveza blancas oscura” (Weissbier Dunkel) a sus
cervezas de trigo negras. Los alemanes utilizan indiscriminadamente los
términos cerveza blanca (Weissbier) y cerveza de trigo (Weizenbier).`,
        group: "ALE",
        genericType: { connect: { id: rubia.id } }
      },
    });
  }////////////////////////////////////////////////////////////////////////////////////////////

  {// LAGER O FERMENTACION INFERIOR ///////////////////////////////////////////////////////////
    await prisma.specificType.create({
      data: {
        type: "Pilsner",
        description: `En sus orígenes la procedencia de la Pilsner fue la ciudad checa de Pize. Es
siempre una cerveza de paja, de fermentación inferior, con un moderado
amargor de lúpulo y ligeramente malteada. Su porcentaje de alcohol oscila
entre 4,5% y un 5,5%. Al igual que muchas otras cervezas de su clase,
originalmente era una bebida de mucho cuerpo, siendo en l actualidad una
cerveza clara y neutra.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Dortumunder",
        description: `La Dortumender se diferencia de la Pilsner por su color algo más oscuro, su
menor contenido de lúpulo y un sabor más suave y pleno. En Dortmund,
Alemania, donde tiene su origen, se denomina “export”. En Holanda utilizan la
abreviatura Dort, pero en este caso se trata de un tipo de cerveza más dulce y
con mayor contenido de alcohol.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Viena",
        description: `Cerveza Märzen, Oktoberfest.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Munich",
        description: `Esta es la variante bávara de la lager, tanto en versión clara como oscura. En
Alemania, la versión oscura se reconoce por el nombre de dukel (oscura). La
Munich es una cerveza malteada con un sabor razonablemente neutro.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Bock",
        description: `El término Bock procede de la ciudad alemana de Einbeck. Las cervezas Bock,
así como las Doppelbock, son de fermentación inferior, tienen un mayor
contenido de alcohol y se caracterizan normalmente por un dulzor de malta. Se
venden generalmente como cervezas de temporada, aunque no en todas
partes.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Rauchbier",
        description: `(cerveza ahumada)
Las Rauchbiers son cervezas en las que el secado de la malta tiene lugar
sobre el humo procedente de madera. Pueden ser de fermentación superior o
inferior. Se caracteriza por su sabor ahumado. Este tipo predomina en
Bamberg, Alemania, aunque también se elaboran en Escocia, Francia y Alaska.`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Schwarzbier",
        description: `(cerveza negra)`,
        group: "LAGER",
        genericType: { connect: { id: rubia.id } }
      },
    });


  }////////////////////////////////////////////////////////////////////////////////////////////


  {// LAMBIC O FERMENTACION ESPONTANEA ////////////////////////////////////////////////////////

    await prisma.specificType.create({
      data: {
        type: "Gueuze",
        description: `La mezcla y embotellado de una Lambic madura con una Lambic joven da
lugar a una cerveza agridulce más enérgica que la Lambic propiamente dicha.
Esta mezcla se denomina Gueuze.`,
        group: "LAMBIC",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Faro",
        description: `Es simplemente una Lambic (cerveza de fermentación espontánea) a la que se
ha añadido azúcar para endulzarla. Son asimismo Faro, las mezclas de Lambic
con cervezas de fermentación superior.`,
        group: "LAMBIC",
        genericType: { connect: { id: rubia.id } }
      },
    });

    await prisma.specificType.create({
      data: {
        type: "Cerveza de fruta",
        description: `Bajo esta denominación se agrupa un conjunto de cervezas, principalmente
belgas, con una adición de fruta. La cerveza básica puede ser una Lambic,
pero normalmente es una Gueuze u otra de fermentación superior normal. La
denominación Gueuze o Lambic puede verse en la etiqueta. Las frutas más
frecuentes son cervezas y frambuesas, aunque el abanico de posibilidades es
enorme, como manzanas, plátanos y moras. Los sabores son muy variados. `,
        group: "LAMBIC",
        genericType: { connect: { id: rubia.id } }
      },
    });


  }///////////////////////////////////////////////////////////////



  ////TRANSACTION
  const amount = 300;
  ////////AUTOPOST para faqqqquu////////////////

  await (async () => {
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
    let comments = ["Horrible", "Mala", "Decente", "Muy buena", "Excelente"]

    const weekFromNow = add(new Date(), { days: 7 })
    for (let i = 0; i < amount; i++) {

      let randomRating = Math.ceil(Math.random() * 5);

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
        "rating": randomRating,
        "stock": Math.floor(Math.random() * 50),
        "shipping": Math.random() > 0.5 ? true : false,
        "visibility": true,
        "username": usernames[Math.floor(Math.random() * usernames.length)]
      }

      let countable = {
        "price": +(Math.random() * 200 + 75).toFixed(2),
        "discount": Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 25),
        // "expireDate":
      }

      let infoToPost = { beer, infoPost, countable }

      const {
        abv,
        og,
        ibu,
        calories,
        dryHop,
        volume,
        genericType,
        specificType,
      } = infoToPost.beer;
      const {
        title,
        description,
        image,
        stock,
        rating,
        shipping,
        visibility,
        username,
      } = infoToPost.infoPost;

      const {
        price,
        discount,
        expireDate
      }: {
        price: number,
        discount: number,
        expireDate?: Date,
      } = infoToPost.countable

      // const user = await prisma.user.findUnique({ where: { username: username } });
      const beerGenericType = await prisma.genericType.findUnique({ where: { type: genericType } });
      const beerSpecificType = await prisma.specificType.findUnique({ where: { type: specificType } });


      await prisma.post.create({
        data: {
          title,
          description,
          image,
          stock,
          rating,
          shipping,
          visibility,
          review: {
            create: {
              rating: randomRating,
              comment: comments[randomRating - 1],
              userId: 1
            }
          },
          user: {
            connect: { id: 3 },
          },
          beer: {
            create: {
              abv,
              og,
              ibu,
              calories,
              dryHop,
              volume,
              genericType: {
                connect: { id: beerGenericType?.id },
              },
              specificType: {
                connect: { id: beerSpecificType?.id },
              },
            },
          },
          countable: {
            create: {
              price,
              discount,
              expireDate,
            }
          }
        },
      })

    }


    console.log("Autopost hecho, " + amount + " post creados en userName: 'TestPremium', password:'password'")

  })()
  /////////////////////////////////////


  ///AUTO Transaction //////////////////
  for (let i = 0; i < 10; i++) {
    await prisma.transaction.create({
      data: {
        price: 150,
        quantity: 3,
        buyerId: 1,
        postId: Math.ceil(Math.random() * amount)
      }
    });

    await prisma.transaction.create({
      data: {
        price: 130,
        quantity: 4,
        buyerId: 2,
        postId: Math.ceil(Math.random() * amount)
      }
    });

    await prisma.transaction.create({
      data: {
        price: 190,
        quantity: 5,
        buyerId: 3,
        postId: Math.ceil(Math.random() * amount)
      }
    });
  }
  ///////////////////////////////////
}


main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });