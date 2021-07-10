/*

SAYNOMORE-1993

*/


////////////////////////////////////////////
////////////////////////////////////////////;

select * from "Role";

select * from "User";

select * from "Cart";

select * from "PostsOnCart";

select * from "Beer";

select * from "GenericType";

select * from "SpecificType";

select * from "Transaction";

select * from "Post";

select * from "Countable";

/*TIRAR ABAJO A CERO, VOLVER A CARGAR EL ESQUEMA Y CARGAR SEED DE VUELTA*/
npx prisma migrate reset --skip-seed --skip-generate; npx prisma db push --skip-generate;  npx prisma generate; npm run seed;

/* TIRAR ABAJO DATABASE CON IDS TAMBIEN, DESPUES npx prisma db push!! */
DROP TABLE "Role" CASCADE;
DROP TABLE "User" CASCADE;
DROP TABLE "Cart" CASCADE;
DROP TABLE "PostsOnCart" CASCADE;
DROP TABLE "Beer" CASCADE;
DROP TABLE "GenericType" CASCADE;
DROP TABLE "SpecificType" CASCADE;
DROP TABLE "Transaction" CASCADE;
DROP TABLE "Post" CASCADE;
DROP TABLE "Countable" CASCADE;


/* Pushiar cambios a database + Actualizar el modulo de PrismaClient */
npx prisma db push
npx prisma generate




