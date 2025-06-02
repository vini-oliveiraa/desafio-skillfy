import type { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Task } from "../../contexts/TaskContext";

interface ProductivityChartProps {
  tasks: Task[];
}

export const ProductivityChart: FC<ProductivityChartProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === "done").length;
  const pendingTasks = tasks.filter(task => task.status !== "done").length;

  const data = [ 
    {name: "Concluídas", value: completedTasks },
    {name: "Pendentes", value: pendingTasks}
  ]
  const colors = ["#10B981", "#FBBF24"];

  return (
    <div className="shadow-lg rounded-md my-2 mx-2 p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">Gráfico de Produtividade</h2>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
