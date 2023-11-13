import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";

export default function Home() {
  console.log("Test de composant");

  return (
    <main className="">
      <h2>Bienvenue à tout le monde</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, facere.
        Ducimus quasi dolorem fuga! Laborum doloribus animi et esse maxime,
        quos, quis corporis aliquam labore, dolorem blanditiis incidunt
        praesentium est?
      </p>
      <Link href="/connexion">Connectez-vous </Link>

      <Button />
    </main>
  );
}
