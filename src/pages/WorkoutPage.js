import React, { useState } from "react";
import Workout from "../components/Workout";
import initalData from "../initalData";
import { useWorkout, useWorkoutDispatch } from "../context/WorkoutContext";

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
    dispatch({type:"add-workout"})
  };

  return (
    <div className="pt-16">
      {workoutName === "" ? (
        <div className="border max-w-4xl mx-auto">
          <div>
            <h1 className="text-4xl capitalize">Workouts</h1>
            <button className="bg-white" onClick={handleAddWorkout}> add workout</button>
          </div>
          <div className="flex gap-4">
            {renderWorkouts.map(({ id, name }) => (
              <WorkoutTab onClick={() => handleWorkoutSelect(id)}>{name}</WorkoutTab>
            ))}
          </div>
        </div>
      ) : (
        <Workout onBack={() => setWorkoutName("")} {...workouts[workoutName]}></Workout>
      )}
    </div>
  );
}

const WorkoutTab = ({ children, onClick = () => {} }) => {
  return (
    <div onClick={onClick}>
      <label className="text-3xl capitalize">{children}</label>
    </div>
  );
};
