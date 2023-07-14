import React, { useState } from "react";
import Workout from "../components/Workout";
import initalData from "../initalData";
import { useWorkout, useWorkoutDispatch } from "../context/WorkoutContext";
import DynamicWidthInput from "../components/DynamicInput";

export default function WorkoutPage() {
  const [state, setState] = useState(initalData);
  const [workoutName, setWorkoutName] = useState("");
  const { workouts, workoutIds } = useWorkout();
  const dispatch = useWorkoutDispatch();
  const renderWorkouts = workoutIds.map((id) => workouts[id]);

  const handleWorkoutSelect = (workoutId) => {
    setWorkoutName(workoutId);
  };

  const handleAddWorkout = () => {
    dispatch({ type: "add-workout" });
  };

  return (
    <div className="pt-16">
      {workoutName === "" ? (
        <div className="border max-w-4xl mx-auto">
          <div>
            <h1 className="text-4xl capitalize mb-2">Workouts</h1>
            {/* <DynamicWidthInput />
            <TextResizer /> */}
            {/* <button className="bg-white" onClick={handleAddWorkout}> add workout</button> */}
          </div>
          <div className="grid gap-4">
            {renderWorkouts.map(({ id, name }) => (
              <>
                <WorkoutTab id={id} onClick={() => handleWorkoutSelect(id)}>
                  {name}
                </WorkoutTab>
              </>
            ))}
          </div>
          <button className="bg-zinc-400 rounded-md p-2 text-white mt-4" onClick={handleAddWorkout}>
            Add Workout
          </button>
        </div>
      ) : (
        <Workout onBack={() => setWorkoutName("")} {...workouts[workoutName]}></Workout>
      )}
    </div>
  );
}

const WorkoutTab = ({ children, onClick = () => {}, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textState, setTextState] = useState(children);
  const dispatch = useWorkoutDispatch();
  // console.log("HELLOOO", id, children);

  const handleEdit = (text) => {
    setTextState(text);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    dispatch({ type: "edit-text", workoutId: id, text: textState });
    setIsEditing(false);
    console.log(id, children);
  };

  return (
    <div onClick={onClick}>
      {isEditing ? (
        <>
          <DynamicWidthInput text={children} onChange={handleEdit} />
          <button onClick={(e) => handleClose(e)}>close</button>
        </>
      ) : (
        <>
          <label className="text-3xl cursor-pointer">{children}</label>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};
