import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";

// Creation d'une fonction pour chercher les données
const getData = async () => {
  // Revalidation
  const res = await fetch("http://localhost:4000/articles", {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data;
};

type Article = {
  id: number;
  titre: string;
  contenu: string;
  date: string;
  user_id: number;
  lienImage: string;
};

export default async function Home() {
  const articles = await getData();
  return (
    <main className="p-40">
      <h2 className="text-purple-400">Bienvenue à tout le monde</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, facere.
        Ducimus quasi dolorem fuga! Laborum doloribus animi et esse maxime,
        quos, quis corporis aliquam labore, dolorem blanditiis incidunt
        praesentium est?
      </p>
      <Link href="/connexion">Connectez-vous </Link>

      <Button />

      <div className="flex gap-4 flex-wrap">
        {
          // Affichage des données
          articles.map((article: Article) => (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <Image
                  src={article.lienImage}
                  width={250}
                  height={250}
                  alt="Shoes"
                  className="w-full  object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{article.titre}</h2>

                <div className="card-actions justify-end">
                  <Link
                    href={`/articles/${article.id}`}
                    className="btn btn-primary"
                  >
                    Visitez l'article
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <Link href="/articles/create" className="btn btn-success mt-5">
        Ajouter un article
      </Link>
    </main>
  );
}
