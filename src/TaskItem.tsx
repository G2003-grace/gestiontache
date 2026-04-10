import React from 'react'
import type { Tache, Statut } from "./types"


type Props = {
  tache: Tache;
  onDelete: () => void;
  onToggle: (id: number) => void;
  onChangeStatut: (id: number) => void;
};

const TaskItem = ({ tache, onDelete, onToggle, onChangeStatut }: Props) => {
  return (
    <div>
    
   

      <h3>{tache.input}</h3>

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
          onClick={() => onChangeStatut(tache.id)}
          className="btn btn-sm btn-info btn-soft"
        >
          Avancer
        </button>

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