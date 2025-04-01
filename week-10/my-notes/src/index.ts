import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get
async function getUser(username: string) {
  const res = await prisma.user.findFirst({
    where: { email: username },
  });
  console.log(res);
}

getUser('raj@manna1.com');

//-----------------------------------------------------

// Insert
// async function insertUser(
//   username: string,
//   password: string,
//   firstName: string,
//   lastName: string
// ) {
//   const res = await prisma.user.create({
//     data: {
//       email: username,
//       password,
//       firstName,
//       lastName,
//     },
//     select: {
//       id: true,
//       password: true,
//       firstName: true,
//     },
//   });

//   console.log(res);
// }

// insertUser("raj@manna1.com", "password", "raj", "manna");

//----------------------------------------------------------------

// Update
// interface updateParams {
//   firstName: string;
//   lastName: string;
// }

// async function updateUser(
//   username: string,
//   { firstName, lastName }: updateParams
// ) {
//   const res = await prisma.user.update({
//     where: { email: username },
//     data: {
//       firstName,
//       lastName,
//     },
//   });

//   console.log(res);
// }

// updateUser('raj@manna.com', {
//   firstName: 'raj',
//   lastName: 'dev',
// });
