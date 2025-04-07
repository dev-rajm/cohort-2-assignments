interface User {
  id: string;
  name: string;
  age: number;
  email: number;
  password: string;
}

// Ugly approach
// interface updateUser {
//   email: string;
//   age: number;
//   password: string;
// }

// Better approach (use pick)
type updateUser = Pick<User, "email" | "age" | "password">;

type updateUserOptional = Partial<updateUser>; // help you to make types optional

function updateUser(updateProps: updateUser) {
  // Hit the database to update the user
  // Note: You need to only allow users to change there name and age not more then that
  // Note: What if the user only update there
}
