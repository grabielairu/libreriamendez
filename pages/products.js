import axios from "axios";
import { useEffect, useState } from "react";

//petición a la api
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/supabase/productsdb"); // Cambia la URL para apuntar a la tabla de productos
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}
export default function Products({ data }) {
  return (
    <main className="h-full w-screen bg-pink-900 p-10">
      {data.map((product) => (
        <div
          key={product.id}
          className="flex flex-col bg-white p-5 m-5 rounded shadow-lg"
        >
          <h1 className="text-black text-2xl mb-2">{product.name}</h1>
          <h2 className="text-gray-700 text-lg">{product.category}</h2>
          <h3 className="text-gray-700 text-lg">{`Precio: ${product.price}`}</h3>{" "}
          {/* Aquí se muestra el precio */}
          <div className="text-indigo-500">{product.options}</div>
        </div>
      ))}
    </main>
  );
}
