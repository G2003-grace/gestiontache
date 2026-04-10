import React, { useEffect, useMemo, useReducer } from 'react'
import TaskForm from './TaskForm'
import useLocalStorage from './useLocalStorage'
import TaskList from './TaskList'

type Statut = "A faire" | "En cours" | "Terminé";
type Filtre = "Tous" | Statut;

type Tache = {
  id: number;
  text: string;
  statut: Statut;
  description: string;
  bought: boolean;
};
/*Encore!!!*/

const filtres: Filtre[] = ["Tous", "A faire", "En cours", "Terminé"];


const tachesReducer = (state: Tache[], action: any): Tache[] => {
  switch (action.type) {
    case "AJOUTER":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          description: action.payload.description,
          statut: action.payload.statut,
          bought: false,
        },
      ];

    case "SUPPRIMER":
      return state.filter((t) => t.id !== action.payload.id);

    case "TOGGLE_ACHETE": /*ACHETE???*/
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, bought: !t.bought } : t
      );

    default:
      return state;
  }
};

const App = () => {
  const [savedTaches, setSavedTaches] = useLocalStorage<Tache[]>("articles", []);
  const [taches, dispatch] = useReducer(tachesReducer, savedTaches);
  const [filtre, setFiltre] = useLocalStorage<Filtre>("filtre", "Tous");

  useEffect(() => {
    setSavedTaches(taches);
  }, [taches, setSavedTaches]);

  
  const tachesFiltres = useMemo(() => {
    switch (filtre) {
      case "A faire":
        return taches.filter((t) => t.statut === "A faire");
      case "En cours":
        return taches.filter((t) => t.statut === "En cours");
      case "Terminé":
        return taches.filter((t) => t.statut === "Terminé");
      default:
        return taches;
    }
  }, [taches, filtre]);

  
  const restants = useMemo(
    () => taches.filter((t) => t.statut !== "En cours").length,
    [taches]
  );

  function handleAjouter(text: string, description: string, statut: Statut) {
    dispatch({ type: "AJOUTER", payload: { text, description, statut } });
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      
      <TaskForm onAjouter={handleAjouter} />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {filtres.map((f) => (
          <button
            key={f}
            className={`btn btn-soft btn-sm ${filtre === f ? "btn-primary" : ""}`}
            onClick={() => setFiltre(f)}
          >
            {f}
          </button>
        ))}

        <span className="ml-auto text-sm opacity-70">
          {restants} tache{restants !== 1 ? "s" : ""} restant{restants !== 1 ? "s" : ""}
        </span>
      </div>

      <TaskList
        taches={tachesFiltres}
        onToggle={(id) => dispatch({ type: "TOGGLE_ACHETE", payload: { id } })}
        onDelete={(id) => dispatch({ type: "SUPPRIMER", payload: { id } })}
      />
    </div>
  );
};

export default App;