const initalData = {
  workoutIds: ["monday"],
  workouts: {
    monday: {
      id: "monday",
      name: "monday",
      exerciseIds: ["bench-press", "shoulder-press", "machine-fly"],
    },
  },
  exercises: {
    "bench-press": {
      id: "bench-press",
      name: "Bench Press",
      sets: [
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
      ],
    },
    "shoulder-press": {
      id: "shoulder-press",
      name: "Shoulder Press",
      sets: [
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
      ],
    },
    "machine-fly": {
      id: "machine-fly",
      name: "Machine Fly",
      sets: [
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
        { reps: "10", weight: "10" },
      ],
    },
  },
};

export default initalData;
