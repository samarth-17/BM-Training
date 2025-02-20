import React from "react";
import { useTasks } from "./TaskContext";

const TaskSummary = () => {
  const { completedTasks } = useTasks();

  return <p>Completed Tasks: {completedTasks}</p>;
};

export default TaskSummary;
