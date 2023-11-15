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
export default function TestDB({ data }) {
  console.log(data);
  return (
    <main className="h-screen w-screen bg-gray-500">
      <h1 className="text-4xl text-center text-white">{data[0].title}</h1>
      {data.map((books) => (
        <div className="flex" key={books.id}>
          <h1 className="text-white">{books.title}</h1>
          <h2 className="text-white text-sm">{books.genre}</h2>
        </div>
      ))}
    </main>
  );
}
