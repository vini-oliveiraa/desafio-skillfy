import type {FC} from "react";
import moment from "moment";
import { PencilIcon } from "@heroicons/react/16/solid";
import type { Task } from "../../contexts/TaskContext";
import { useNavigate } from "react-router-dom";



interface TaskCardProps {
  task: Task;
}

const urgencyColors = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-red-500",
};

export const TaskCard: FC<TaskCardProps> = ({task})=>{
  const go = useNavigate()
  const redirectEditTask = () => {
    go("/form", { state: { task } });
  };

      return (
  
    <div className="bg-white flex flex-row w-72 rounded-2xl p-4 shadow-sm hover:shadow-md transition space-y-2">
      <div>
      <div className="flex items-center gap-2">
      <span className={`relative rounded-xl flex h-3 w-3 ${urgencyColors[task.priority]}`}>
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${urgencyColors[task.priority]}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${urgencyColors[task.priority]}`}
        ></span>
      </span>
    </div>

      <h1 className="text-lg font-semibold">{task.title}</h1>
      <h3 className="text-sm ">{task.description}</h3>
      <p className="text-sm text-gray-600">Prazo: {moment(task.deadline).format("DD/MM/YYYY")}</p>
      {task.suggested_time && (
        <p className="text-sm text-gray-600">
          Tempo sugerido: {moment(task.suggested_time).format("HH:mm")}
        </p>
      )}
    </div>
    <div onClick={redirectEditTask} className=" w-4 cursor-pointer  text-[#10B981]">
      <PencilIcon/>
    </div>
    </div>
  );
};