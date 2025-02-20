import React from "react";
import { useTasks } from "./TaskContext";

const TaskList = () => {
  const { tasks, toggleTask, removeTask } = useTasks();

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.text}
          </span>
          <button onClick={() => toggleTask(task.id)}>Toggle</button>
          <button onClick={() => removeTask(task.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
