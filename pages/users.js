import axios from "axios";
import { useEffect, useState } from "react";

//petición a la api
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/supabase");
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}
export default function Users({ data }) {
  console.log(data);
  return (
    <main className="h-screen w-screen bg-gray-500">
      {data.map((users) => (
        <div className="flex" key={users.id}>
          <h1 className="text-white">{users.title}</h1>
          <h2 className="text-white text-sm">{users.genre}</h2>
        </div>
      ))}
    </main>
  );
}
