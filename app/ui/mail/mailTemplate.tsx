import React from "react";

interface EmailTemplateProps {
  nom: string;
  titre: string;
  description: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  nom,
  titre,
  description,
}) => (
  <>
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      <header>
        <a href="#">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
            alt=""
          />
        </a>
      </header>

      <main className="mt-8">
        <h2 className="text-gray-700 dark:text-gray-200">Bonjour {nom},</h2>

        <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
          Il y a une nouvelle tache qui vous a été assignée par
          <span className="font-semibold ">Task app</span>.
        </p>

        <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Cliquez ici pour voir la tache
        </button>

        <div className="mt-2">
          <span className="font-semibold ">Titre:</span> {titre}
          <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Merci, <br />
          <span className="font-semibold">Task app</span>
        </p>
      </main>

      <footer className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          Ce mail a été envoyé à
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
          >
            {nom}
          </a>
          .
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          © Taskapp. All Rights Reserved.
        </p>
      </footer>
    </section>
  </>
);
