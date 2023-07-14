import React, { useState } from "react";
import Set from "./Set";
import DynamicWidthInput from "./DynamicInput";
import { useWorkout, useWorkoutDispatch } from "../context/WorkoutContext";

export default function Exercise({ id, onDelete = () => {} }) {
  const [isEditing, setIsEditing] = useState(false);
  const { exercises } = useWorkout();
  const dispatch = useWorkoutDispatch();

  const name = exercises[id].name;
  const [textState, setTextState] = useState(name);

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

  const handleEdit = (value) => {
    setTextState(value);
  };

  const handleClose = () => {
    setIsEditing(false);
    dispatch({ type: "edit-text", exerciseId: id, text: textState });
  };

  return (
    <div className="">
      <div className="flex gap-2 text-2xl">
        {isEditing ? (
          <>
            <DynamicWidthInput text={textState} onChange={handleEdit} fontSize="1.5rem" increment={14.5} />
            <button onClick={handleClose}>close</button>
          </>
        ) : (
          <>
            <h2>{textState}</h2>
            <button onClick={() => setIsEditing(true)}>edit</button>
          </>
        )}

        <button onClick={handleAddSet} className="bg-white p-1">
          Add
        </button>
        <button onClick={() => onDelete(id)} className="bg-white p-1">
          Delete
        </button>
      </div>
      <div className="flex gap-4 bg-blue-50 h-[2.5rem] px-2">
        {exercises[id].sets.map((set, i) => (
          <Set key={i} {...set} onChange={(name, num) => handleSetUpdate(i, name, num)} onDelete={() => handleDeleteSet(i)}></Set>
        ))}
      </div>
    </div>
  );
}
