import React from "react";
import Set from "./Set";
import { useWorkout, useWorkoutDispatch } from "../context/WorkoutContext";

export default function Exercise({ id, onDelete = () => {} }) {
  const { exercises } = useWorkout();
  const dispatch = useWorkoutDispatch();

  const name = exercises[id].name;

  const handleAddSet = () => {
    dispatch({ type: "add-set", exerciseId: id });
  };

  const handleSetUpdate = (index, name, num) => {
    console.log(index, name, num);
    dispatch({ type: "update-set", exerciseId: id, index, name, num });
  };

  const handleDeleteSet = (index) => {
    dispatch({ type: "delete-set", exerciseId: id, index });
  };

  return (
    <div className="">
      <div className="flex gap-2 text-xl">
        <h2>{name}</h2>
        <button onClick={handleAddSet} className="bg-white p-1">
          Add
        </button>
        <button onClick={() => onDelete(id)} className="bg-white p-1">
          Delete
        </button>
      </div>
      <div className="flex gap-2 bg-blue-50">
        {exercises[id].sets.map((set, i) => (
          <Set key={i} {...set} onChange={(name, num) => handleSetUpdate(i, name, num)} onDelete={() => handleDeleteSet(i)}></Set>
        ))}
      </div>
    </div>
  );
}
