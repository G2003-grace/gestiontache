import React, { useState } from 'react'

type Props = {
  onAjouter: (text: string, description: string, statut: Statut) => void
}

type Statut = "A faire" | "En cours" | "Terminé";

type Tache = {
  id: number;
  text: string;
  statut: Statut;
  description: string;
  bought: boolean;
};
/*Encore ces types et aussi les noms des champs*/

const TaskForm = ({ onAjouter }: Props) => {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState<Statut>("A faire");

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (input.trim() === "") return;

    onAjouter(input.trim(), description.trim(), statut);

    setInput("");
    setDescription("");
    setStatut("A faire");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        Tache
      </h1>

      <input
        type="text"
        placeholder="Titre du tache"
        className="input input-bordered flex-1 min-w-[150px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="text"
        placeholder="Ajouter une description"
        className="input input-bordered w-40"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="select select-bordered"
        value={statut}
        onChange={(e) => setStatut(e.target.value as Statut)}
      >
        <option value="A faire">A faire</option>
        <option value="En cours">En cours</option>
        <option value="Terminé">Terminé</option>
      </select>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Ajouter
      </button>
    </div>
  );
}

export default TaskForm;