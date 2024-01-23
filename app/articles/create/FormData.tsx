"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./formData.module.css";

type Props = {};

export default function Ajouter({}: Props) {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Ajout d'un article
    fetch("http://localhost:4000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 1000),
        titre: data.titre,
        contenu: data.contenu,
        auteur: data.auteur,
        date: new Date(),
      }),
    }).then(() => {
      router.refresh();
      router.push("/");
    });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.titre}>Ajouter un article</h1>
        <div className={styles.formGroup}>
          <label htmlFor="titre">Titre</label>
          <input type="text" name="titre" id="titre" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contenu">Contenu</label>
          <textarea name="contenu" id="contenu" cols={30} rows={10}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="auteur">Auteur</label>
          <input type="text" name="auteur" id="auteur" />
        </div>
        <div>
          <button type="submit" className={styles.btn}>
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
