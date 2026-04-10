export type Statut = "A faire" | "En cours" | "Terminé";

export type Tache = { /*Les noms des champs ne sont pas très parlant. Par exemple text et bought n'ont pas vraiment de sens.*/
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
<<<<<<< HEAD
        input: string;
=======
        text: string; /*Champ mal nommé*/
>>>>>>> 7f5872f1270389ab47472e1af38e42aeacd0e6cb
        description: string;
        statut: Statut;
      };
    }
  | {
      type: "SUPPRIMER";
      payload: { id: number };
    }
  | {
<<<<<<< HEAD
      type: "TOGGLE";
=======
      type: "TOGGLE_BOUGHT"; /*Pourquoi la nomination bought*/
>>>>>>> 7f5872f1270389ab47472e1af38e42aeacd0e6cb
      payload: { id: number };
    }
  | {
      type: "SET_TACHES";
      payload: Tache[];
    };