import React from "react";
import { TaskProvider } from "./components/TaskContext"
import TaskApp from "./components/TaskMain"

const App = () => (
  <TaskProvider>
    <TaskApp />
  </TaskProvider>
);

export default App;
