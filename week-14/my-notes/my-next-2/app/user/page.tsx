// "use client";
import client from '@/db';

// Bad approach for data fetching because you still sending request from browser instead of server.
// import { useEffect, useState } from "react";
// export default function User() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//   });
//   useEffect(() => {
//     axios
//       .get(
//         " https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
//       )
//       .then((response) => {
//         setData(response.data);
//       });
//   }, []);
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="border border-slate-400 flex flex-col p-4">
//         <p>{data.name}</p>
//         <p>{data.email}</p>
//       </div>
//     </div>
//   );
// }

// Better approach: you can now send request from nextjs server.
// No need of useState, useEffect
async function fetchData() {
  const res = await client.user.findFirst({});
  return res;
}

// server side data fetching
export default async function User() {
  const data = await fetchData();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-slate-400 flex flex-col p-4">
        <p>{data?.email}</p>
      </div>
    </div>
  );
}
