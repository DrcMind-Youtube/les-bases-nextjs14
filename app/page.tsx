import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";

async function getData() {
  const res = await fetch("http://localhost:4000/articles", {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error("Il y a eu une erreur");
  }

  return res.json();
}

type Post = {
  id: number;
  titre: string;
  contenu: string;
  userId: number;
};

export default async function Home() {
  // console.log("Test de composant");
  const posts = await getData();

  console.log(posts);

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

      <div className="container">
        {posts.map((post: Post) => (
          <div key={post.id} className="carte">
            <Link href={`/articles/${post.id}`}>
              {post.id}. {post.titre}
            </Link>
          </div>
        ))}
      </div>

      <div>
        <Link href="/articles/create">Ajouter un article</Link>
      </div>
    </main>
  );
}
