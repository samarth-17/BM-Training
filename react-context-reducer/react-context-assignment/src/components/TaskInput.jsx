import React, { useState } from "react";
import { useTasks } from "./TaskContext";

const TaskInput = () => {
  const { addTask } = useTasks();
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
