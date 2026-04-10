import React from 'react'

type Statut = "A faire" | "En cours" | "Terminé";

type Tache = {
  id: number;
  text: string;
  statut: Statut;
  description: string;
  bought: boolean;
};
/*Pourquoi??*/

type Props = {
  tache: Tache;
  onDelete: () => void;
  onToggle: (id: number) => void;
};

const TaskItem = ({ tache, onDelete, onToggle }: Props) => {
  return (
    <div>
    {/* Ce bouton est-il correct et à quoi sert ce bouton? */}
      <button onClick={() => onToggle(tache.id)}>
        {tache.bought ? "" : ""}
      </button>

      <h3>{tache.text}</h3>

      <p>{tache.description}</p>

      
      <div className="flex items-center justify-between mt-2">
        <p>
          Statut :
          <span
            className={`badge badge-sm badge-soft
              ${
                tache.statut === "A faire"

                ? "badge-success"
                  : tache.statut === "En cours"
                  ? "badge-warning"
                  : "badge-primary"
              }`}
          >
            {tache.statut}
          </span>
        </p>

        <button
          onClick={onDelete}
          className="btn btn-sm btn-error btn-soft ml-4"
        >
          Supprimer
        </button>
      </div>

    </div>
  );
};

export default TaskItem;