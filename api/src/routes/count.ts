import { Prisma, PrismaClient } from "@prisma/client";
import { PrimaryExpression } from "typescript";

let prisma = new PrismaClient();


console.log("Ya!")

console.log("Ya!")



/**
  * Returns the average of two numbers.
  * @resumen
  * El metodo devuelve un array con numeros random en base a la cantidad total de filas de una tabla
  * @parametros howMany - Cuantos items queres que tenga el array
  */
async function RandomItems(howMany: number) {
  let countBeers = await prisma.beer.count(); //agregar el nombre de la tabla

  var arraySixBeers: number[] = []
  for (let i = 1; i <= howMany; i++) {
    arraySixBeers.push(Math.ceil(Math.random() * countBeers))
  }

  return arraySixBeers
}

RandomItems(5).then(res => console.log(res))
