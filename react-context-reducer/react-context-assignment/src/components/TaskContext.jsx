import React, { createContext, useReducer, useContext } from "react";

const TaskContext = createContext();

const taskReducer = (tasks, action) => {
  if (action.type === "ADD_TASK") {
    return [...tasks, { id: Date.now(), text: action.text, completed: false }];
  }
  if (action.type === "REMOVE_TASK") {
    return tasks.filter(task => task.id !== action.id);
  }
  if (action.type === "TOGGLE_TASK") {
    return tasks.map(task =>
      task.id === action.id ? { ...task, completed: !task.completed } : task
    );
  }
  return tasks;
};

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = (text) => {
    dispatch({ type: "ADD_TASK", text });
  };

  const removeTask = (id) => {
    dispatch({ type: "REMOVE_TASK", id });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", id });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export { TaskProvider, useTasks };
