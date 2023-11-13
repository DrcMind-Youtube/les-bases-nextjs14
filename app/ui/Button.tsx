"use client";

import React from "react";

export default function Button() {
  console.log("Test de composant client");
  return <button onClick={() => alert("salut")}>Dire bonjour</button>;
}
