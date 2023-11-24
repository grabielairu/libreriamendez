import axios from "axios";
import { useState } from "react";

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
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const totalPrice = selectedProducts.reduce(
    (total, product) => total + product.price,
    0
  );

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
          <button
            className="text-red-500"
            onClick={() => handleSelectProduct(product)}
          >
            Seleccionar
          </button>
        </div>
      ))}
      <h2>Productos seleccionados:</h2>
      {selectedProducts.map((product) => (
        <div className="p-2" key={product.id}>
          <span>{product.name}</span>
          <button
            className="p-2 ml-2 bg-red-500"
            onClick={() => handleRemoveProduct(product.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <div>Total: {totalPrice}</div>
    </main>
  );
}
