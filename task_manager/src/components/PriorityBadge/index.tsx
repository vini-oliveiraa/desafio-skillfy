import type { FC } from "react";
import { TaskCard } from "../TaskCard/";
import type { Task } from "../../contexts/TaskContext";

interface PriorityBadgeProps {
  tasks: Task[];
}

export const PriorityBadge: FC<PriorityBadgeProps> = ({ tasks }) => {
  const highPriorityTasks = tasks.filter(task => task.priority === "high");

  return (
    <div className=" shadow-lg rounded-md my-2 mx-2 p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">Tarefas prioritárias</h2>
      <div className="flex flex-wrap gap-4">
        {highPriorityTasks.length > 0 ? (
          highPriorityTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-[#6B7280]">Você não tem tarefas de alta prioridade!</p>
        )}
      </div>
    </div>
  );
};
