import React, { createContext, useReducer, useCallback, useMemo, useContext } from "react";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = useCallback((text) => {
    dispatch({ type: "ADD_TASK", payload: text });
  }, []);

  const removeTask = useCallback((id) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const completedTasks = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, completedTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export { TaskProvider, useTasks };
