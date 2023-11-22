import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //lógica en js
  const name = "Gabi";

  return (
    <main className="h-full w-auto bg-gray-500">
      <h1 className="text-4xl text-center text-white">Hola a mi gato</h1>
      <Link href="/demo" className="text-4xl text-center text-yellow-400">
        Demo
      </Link>
    </main>
  );
}
