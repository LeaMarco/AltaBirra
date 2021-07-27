import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/autentication/controllers/auth.controller";

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
      email: "TestUser@email.com",
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
      email: "TestAdmin@email.com",
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
      email: "TestPremium@email.com",
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



  //   /////////////COSAS DE PRODUCCION////////////////////
  //   //POSTS

  //   //ADD TO CART

  //   //SIGN-UP OF USER

  //   //TRANSACTION

  //   //NO HACE FALTA ADD BEER, SE CREA SIEMPRE DESDE POST

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