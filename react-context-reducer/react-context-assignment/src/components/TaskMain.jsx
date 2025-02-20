import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TaskCount from "./TaskCount";

const TaskApp = () => {
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskInput />
      <TaskCount />
      <TaskList />
    </div>
  );
};

export default TaskApp;
