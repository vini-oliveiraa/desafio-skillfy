import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { PriorityBadge } from "../../components/PriorityBadge";
import { ProductivityChart } from "../../components/ProductivityChart";
import { TaskCard } from "../../components/TaskCard";
import moment from "moment";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);

  const todaysTasks = tasks.filter((task) =>
    moment(task.deadline).isSame(moment(), "day")
  );

  return (
    <div className="p-6 bg-background min-h-screen text-text font-inter space-y-6">
      <h1 className="text-2xl font-bold">Resumo do dia</h1>

      <section className="bg-white shadow-lg rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-semibold text-center">Tarefas para hoje</h2>

        {todaysTasks.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {todaysTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Você não tem tarefas para hoje!
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" rounded-xl p-4">
          <PriorityBadge tasks={tasks} />
        </div>
        <div className=" rounded-xl p-4">
          <ProductivityChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
