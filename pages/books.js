import axios from "axios";
import { useEffect, useState } from "react";

//petición a la api
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/supabase/booksdb");
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}

export default function Books({ data }) {
  const [loading, setLoading] = useState(false);
  console.log(data);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <main className="h-screen w-screen bg-gray-500 flex items-center justify-center">
      <div className="container mx-auto px-4">
        {loading ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleLoading(false)}
          >
            Enviar
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleLoading(true)}
          >
            Volver a Enviar
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {data.map((books) => (
            <div
              className="flex flex-col bg-white p-4 rounded shadow"
              key={books.id}
            >
              <h1 className="text-black text-xl font-bold">{books.title}</h1>
              <h2 className="text-gray-700 text-sm">{books.genre}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
