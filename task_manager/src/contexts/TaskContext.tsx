import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useTasks as useTasksFetcher } from "../hooks/useTasks"; 

export type Task = {
  id: number;
  title: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  estimated_duration: number;
  deadline: string;
  status: "pending" | "in_progress" | "done";
  suggested_time?: string;
};

type TaskContextType = {
  tasks: Task[];
  suggestions: any[]; 
  loading: boolean;
  error: string | null;
  addTask: (task: Task) => void;
  updateTask: (id: number, updated: Partial<Task>) => void;
};

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { tasks, suggestions, loading, error } = useTasksFetcher();

  const addTask = (task: Task) => {
 
  };

  const updateTask = (id: number, updated: Partial<Task>) => {
    
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        suggestions,
        loading,
        error,
        addTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
