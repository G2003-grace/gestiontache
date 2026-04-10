import React, { useEffect, useMemo, useReducer } from 'react'
import TaskForm from './TaskForm'
import useLocalStorage from './useLocalStorage'
import TaskList from './TaskList'

type Statut = "A faire" | "En cours" | "Terminé";
type Filtre = "Tous" | Statut;

type Tache = {
  id: number;
  input: string;
  statut: Statut;
  description: string;
  task: boolean;
};

const filtres: Filtre[] = ["Tous", "A faire", "En cours", "Terminé"];

const tachesReducer = (state: Tache[], action: any): Tache[] => {
  switch (action.type) {
    case "AJOUTER":
      return [
        ...state,
        {
          id: Date.now(),
          input: action.payload.text,
          description: action.payload.description,
          statut: action.payload.statut,
          task: false,
        },
      ];

    case "SUPPRIMER":
      return state.filter((t) => t.id !== action.payload.id);

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, task: !t.task } : t
      );

    case "CHANGER_STATUT":
      return state.map((t) => {
        if (t.id !== action.payload.id) return t;

        let nouveauStatut: Statut;

        if (t.statut === "A faire") nouveauStatut = "En cours";
        else if (t.statut === "En cours") nouveauStatut = "Terminé";
        else nouveauStatut = "A faire";

        return {
          ...t,
          statut: nouveauStatut,
        };
      });

    default:
      return state;
  }
};

const App = () => {
  const [savedTaches, setSavedTaches] = useLocalStorage<Tache[]>("articles", []);

  const [taches, dispatch] = useReducer(
    tachesReducer,
    savedTaches,
    (init) => init
  );

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
    () => taches.filter((t) => t.statut === "En cours").length,
    [taches]
  );

  function handleAjouter(text: string, description: string, statut: Statut) {
    dispatch({ type: "AJOUTER", payload: { text, description, statut } });
    setFiltre("Tous");
  }

  const handleChangeStatut = (id: number) => {
    dispatch({ type: "CHANGER_STATUT", payload: { id } });
  };

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
          {restants} tâche{restants !== 1 ? "s" : ""} restante{restants !== 1 ? "s" : ""}
        </span>
      </div>

      <TaskList
        taches={tachesFiltres}
        onToggle={(id) => dispatch({ type: "TOGGLE", payload: { id } })}
        onDelete={(id) => dispatch({ type: "SUPPRIMER", payload: { id } })}
        onChangeStatut={handleChangeStatut}
      />

    </div>
  );
};

export default App;