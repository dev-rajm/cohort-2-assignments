import client from '@/db';

async function getUserDetails() {
  try {
    const user = await client.user.findFirst({});

    return {
      email: user?.email,
    };
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();
  return <div>Email: {userData?.email}</div>;
}
