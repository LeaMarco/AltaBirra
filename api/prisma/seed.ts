import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
// import { add } from "date-fns";
import { data } from "./data";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {


  ///////////////COSAS PERMANENTES//////////////////

  //ROLES
  await prisma.role.createMany({
    data: [
      {
        name: "USER",
      },
      {
        name: "ADMIN",
      },
    ],
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

  //TIPOS ESPECIFICOS



  //////ALE O FERMENTACION RAPIDA///////////////////////////////////////////////////////////////
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
  //////FIN DE ALE O FERMENTACION RAPIDA///////////////////////////////////////////////////////////////









  /////////////COSAS DE PRODUCCION////////////////////
  //POSTS

  //ADD TO CART

  //SIGN-UP OF USER

  //TRANSACTION

  //NO HACE FALTA ADD BEER, SE CREA SIEMPRE DESDE POST

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



