import React, { useState } from "react";
import Exercise from "./Exercise";
import { useWorkout, useWorkoutDispatch } from "../context/WorkoutContext";
import DynamicWidthInput from "./DynamicInput";

export default function Workout({ id, children, onBack = () => {} }) {
  // const [exerciseIds, setExerciseIds] = useState();
  // const [exercises, setExercises] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const { workouts, exercises } = useWorkout();
  const dispatch = useWorkoutDispatch();
  const name = workouts[id].name;
  const [textState, setTextState] = useState(name);

  const renderExercises = workouts[id].exerciseIds.map((id) => exercises[id]);
  // console.log("ReRender");

  const handleAddExercise = () => {
    dispatch({ type: "add-exercise", workoutId: id });
  };

  const handleDeleteExercise = (delId) => {
    console.log(id, delId);
    dispatch({ type: "delete-exercise", workoutId: id, delId });
  };

  const handleEdit = (value) => {
    setTextState(value);
  };

  const handleClose = () => {
    setIsEditing(false);
    dispatch({ type: "edit-text", workoutId: id, text: textState });
  };

  return (
    <div className="max-w-4xl mx-auto shadow-xl min-h-[30rem] p-8 border border-black">
      <button className="" onClick={onBack}>
        Back
      </button>
      <div className="flex gap-4">
        {isEditing ? (
          <>
            <DynamicWidthInput text={name} onChange={handleEdit} />
            <button onClick={(e) => handleClose(e)}>close</button>
          </>
        ) : (
          <>
            <h1 className="text-3xl mb-2">{name}</h1>
            <button onClick={(e) => setIsEditing(true)}>edit</button>
          </>
        )}
        <button className="p-1 bg-white" onClick={handleAddExercise}>
          Add Exercise
        </button>
      </div>
      {renderExercises.map(({ id }) => (
        <Exercise key={id} id={id} onDelete={handleDeleteExercise} />
      ))}
    </div>
  );
}
