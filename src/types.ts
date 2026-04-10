export type Statut = "A faire" | "En cours" | "Terminé";

export type Tache = {
  id: number;
  input: string;
  statut: Statut;
  description: string;
  task: boolean;
};
export type Filtre = ["Tous", "A faire", "En cours", "Terminé"];

export type Action =
  | {
      type: "AJOUTER";
      payload: {
        input: string;
        description: string;
        statut: Statut;
      };
    }
  | {
      type: "SUPPRIMER";
      payload: { id: number };
    }
  | {
      type: "TOGGLE";
      payload: { id: number };
    }
  | {
      type: "SET_TACHES";
      payload: Tache[];
    };