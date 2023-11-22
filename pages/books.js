import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

//petición a la api con getServerSideProps
// export async function getServerSideProps() {
//   const res = await axios.get("http://localhost:3000/api/supabase/booksdb");
//   const data = await res.data;
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Books({}) {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publication_date, setPublicationDate] = useState("");

  useEffect(() => {
    console.log("useEffect");

    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("/api/supabase/booksdb");
    const data = await res.data;
    setData(data);
  };

  const sendData = async () => {
    setLoading(true);
    console.log("sendData");
    console.log(title, author, genre, publication_date);
    if (
      title === "" ||
      author === "" ||
      genre === "" ||
      publication_date === ""
    ) {
      toast.error("Llena todos los campos");
      setLoading(false);
      return;
    }
    try {
      const resultado = await axios.post("/api/supabase/booksdb", {
        title: title,
        author: author,
        genre: genre,
        publication_date: publication_date,
      });
      toast.success("Datos enviados");
      console.log(resultado);
      getData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteBook = async (id) => {
    try {
      const resultado = await axios.delete(`/api/supabase/booksdb?id=${id}`);
      toast.success("Libro eliminado");
      console.log(resultado);
      getData();
    } catch (error) {
      toast.error("Ocurrió un error");
      console.log(error);
    }
  };

  return (
    <main className="h-auto py-10 w-screen bg-gray-500 flex items-center justify-center">
      <Toaster position="bottom-center" />
      {/* formulario */}
      <div className="container mx-auto py-4 my-4 px-4">
        <div className="flex flex-col mb-4 w-1/2 text-black gap-2">
          <input
            type="text"
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Género"
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fecha de Publicación"
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>

        {loading ? (
          <button
            type="submit"
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled
          >
            Enviar
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={sendData}
          >
            Enviar
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {data.map((books, i) => (
            <div className="flex flex-col bg-white p-4 rounded shadow" key={i}>
              <h1 className="text-black text-xl font-bold">{books.title}</h1>
              <h2 className="text-gray-700 text-sm">{books.genre}</h2>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteBook(books.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
