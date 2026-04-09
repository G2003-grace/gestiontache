export type Statut = "A faire" | "En cours" | "Terminé";

export type Tache = {
  id: number;
  text: string;
  statut: Statut;
  description: string;
  bought: boolean;
};
export type Filtre = ["Tous", "A faire", "En cours", "Terminé"];

export type Action =
  | {
      type: "AJOUTER";
      payload: {
        text: string;
        description: string;
        statut: Statut;
      };
    }
  | {
      type: "SUPPRIMER";
      payload: { id: number };
    }
  | {
      type: "TOGGLE_BOUGHT";
      payload: { id: number };
    }
  | {
      type: "SET_TACHES";
      payload: Tache[];
    };