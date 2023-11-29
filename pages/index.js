import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-indigo-600 text-white p-8">
        <h1 className="text-4xl">Librería Méndez</h1>
        <p className="mt-2 text-indigo-200">Tu fuente de conocimiento</p>
      </header>

      <main className="p-8">
        <section className="hero mb-8">
          <h2 className="text-3xl mb-4">Bienvenido a nuestra librería</h2>
          <p className="text-lg">
            Descubre nuestra amplia selección de libros y encuentra tu próxima
            gran lectura.
          </p>
        </section>

        <section className="image mb-8">
          <Image
            src="https://images.unsplash.com/photo-1572617494814-03b70644cbef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagen de la librería"
            width={500}
            height={300}
          />
        </section>

        <section className="cta">
          <Link
            href="/books"
            className="bg-indigo-600 text-white px-6 py-3 rounded"
          >
            Ver catálogo
          </Link>
        </section>
      </main>

      <footer className="bg-indigo-600 text-white p-8 text-center">
        <p>© 2022 Librería Méndez. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
