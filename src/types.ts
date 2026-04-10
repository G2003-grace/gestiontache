export type Statut = "A faire" | "En cours" | "Terminé";

export type Tache = { /*Les noms des champs ne sont pas très parlant. Par exemple text et bought n'ont pas vraiment de sens.*/
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
        text: string; /*Champ mal nommé*/
        description: string;
        statut: Statut;
      };
    }
  | {
      type: "SUPPRIMER";
      payload: { id: number };
    }
  | {
      type: "TOGGLE_BOUGHT"; /*Pourquoi la nomination bought*/
      payload: { id: number };
    }
  | {
      type: "SET_TACHES";
      payload: Tache[];
    };