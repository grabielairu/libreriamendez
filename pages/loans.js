import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

//petición a la api
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/supabase/loansdb");
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
}

export default function Loans({ data }) {
  console.log(data);
  const [newLoan, setNewLoan] = useState({
    name: "",
    last_name: "",
    title: "",
    loan_date: "",
    return_date: "",
    book_code: "",
  });

  const handleInputChange = (event) => {
    setNewLoan({ ...newLoan, [event.target.name]: event.target.value });
  };

  const handleAddLoan = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/supabase/loansdb",
        newLoan
      );
      if (res.status === 200) {
        console.log("Nuevo préstamo guardado correctamente");
        toast.success("Nuevo préstamo guardado correctamente");
      } else {
        console.log("Error al guardar el nuevo préstamo");
        toast.error("Error al guardar el nuevo préstamo");
      }
    } catch (error) {
      console.error("Error al hacer la petición a la API", error);
      toast.error("Error al hacer la petición a la API");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Apellido
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Título
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha de préstamo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha de devolución
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Código de Libro
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {loan.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {loan.loan_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {loan.return_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {loan.book_code}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="name"
                      value={newLoan.name}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="last_name"
                      value={newLoan.last_name}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="title"
                      value={newLoan.title}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      name="loan_date"
                      value={newLoan.loan_date}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      name="return_date"
                      value={newLoan.return_date}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="book_code"
                      value={newLoan.book_code}
                      onChange={handleInputChange}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500" onClick={handleAddLoan}>
                      Añadir préstamo
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
