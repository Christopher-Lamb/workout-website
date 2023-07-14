import React, { createContext, useContext, useReducer } from "react";
import initalData from "../initalData";

const getId = () => (Date.now() + Math.random()).toString();

const WorkoutContext = createContext(null);

const WorkoutDispatchContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [workout, dispatch] = useReducer(workoutReducer, initalData);

  return (
    <WorkoutContext.Provider value={workout}>
      <WorkoutDispatchContext.Provider value={dispatch}>{children}</WorkoutDispatchContext.Provider>
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}

export function useWorkoutDispatch() {
  return useContext(WorkoutDispatchContext);
}

const workoutReducer = (state, action) => {
  const { workouts, exercises, workoutIds } = state;
  console.log(state);
  const { workoutId, delId, exerciseId, text } = action;
  let newSetsArr = exerciseId ? [...exercises[exerciseId].sets] : [];
  const newId = getId();
  switch (action.type) {
    case "add-set":
      return {
        ...state,
        exercises: { ...exercises, [exerciseId]: { ...exercises[exerciseId], sets: [...exercises[exerciseId].sets, { reps: "0", weight: "0" }] } },
      };
    case "update-set":
      newSetsArr = newSetsArr.map((set, i) => {
        if (i == action.index) {
          if (action.name === "reps") {
            return { ...set, reps: action.num };
          } else {
            return { ...set, weight: action.num };
          }
        } else {
          return set;
        }
      });
      return {
        ...state,
        exercises: { ...exercises, [exerciseId]: { ...exercises[exerciseId], sets: newSetsArr } },
      };
    case "delete-set":
      newSetsArr = newSetsArr.filter((set, i) => action.index !== i);
      return {
        ...state,
        exercises: { ...exercises, [exerciseId]: { ...exercises[exerciseId], sets: newSetsArr } },
      };
    case "add-exercise":
      return {
        ...state,
        workouts: { ...workouts, [workoutId]: { ...workouts[workoutId], exerciseIds: [...workouts[workoutId].exerciseIds, newId] } },
        exercises: { ...exercises, [newId]: { id: newId, name: "Exercise", sets: [{ reps: "0", weight: "0" }] } },
      };
    case "delete-exercise":
      const delExerciseIds = workouts[workoutId].exerciseIds.filter((id) => id !== delId);
      const obj = { ...exercises };
      delete obj[delId];
      console.log(delExerciseIds);
      return { ...state, exercises: obj, workouts: { ...workouts, [workoutId]: { ...workouts[workoutId], exerciseIds: delExerciseIds } } };
    case "add-workout":
      return { ...state, workoutIds: [...workoutIds, newId], workouts: { ...workouts, [newId]: { id: newId, name: "New", exerciseIds: [] } } };
    case "edit-text":
      //Text value type
      if (workoutId) {
        return { ...state, workouts: { ...workouts, [workoutId]: { ...workouts[workoutId], name: text } } };
      } else if (exerciseId) {
        return { ...state, workouts: { ...workouts, [exerciseId]: { ...workouts[exerciseId], name: text } } };
      }
      console.log("STATE", { ...state, workouts: { ...workouts, [exerciseId]: { ...workouts[exerciseId], name: text } } });
  }
};
