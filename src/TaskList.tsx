import React from 'react'
import TaskItem from './TaskItem';

type Statut = "A faire" | "En cours" | "Terminé";

type Tache = {
  id: number;
  input: string;
  statut: Statut;
  description: string;
  task: boolean;
};

type Props = {
  taches: Tache[]; 
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onChangeStatut: (id: number) => void; 
};

const TaskList = ({ taches, onDelete, onToggle, onChangeStatut }: Props) => {

  if (taches.length === 0) {
    return <p className="text-center text-gray-500 mt-5">Aucune tâche</p>
  }

  const statuts: Statut[] = ["A faire", "En cours", "Terminé"];

  const grouped = statuts
    .map((st) => ({
      statut: st,
      items: taches.filter((a) => a.statut === st),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="mt-5 space-y-4">
        {grouped.map((group) => (
          <div key={group.statut}>
            <h2 className="text-lg font-bold mb-2">{group.statut}</h2>

            <ul className="space-y-2">
              {group.items.map((tache) => (
                <TaskItem
                  key={tache.id}
                  tache={tache} 
                  onToggle={onToggle}
                  onDelete={() => onDelete(tache.id)}
                  onChangeStatut={onChangeStatut}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;