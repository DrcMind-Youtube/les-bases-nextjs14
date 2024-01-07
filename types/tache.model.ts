import { User } from "./user.model";

export type Tache = {
  id: number;
  titre: string;
  description: string;
  createdAt: Date;

  userId: string;
  user: User;
  status: "A faire" | "En cours" | "Terminé";
};
