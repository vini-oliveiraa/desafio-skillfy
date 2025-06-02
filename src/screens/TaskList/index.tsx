import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import moment from "moment";
import { CategoryFilter } from "../../components/CategoryFilter";
import { TimeSuggestions } from "../../components/TimeSuggestions";
import { PencilIcon } from "@heroicons/react/16/solid";
import type { Task } from "../../contexts/TaskContext";

export default function TaskList() {
  const { tasks, suggestions, loading } = useTasks();
  const [sortedTasks, setSortedTasks] = useState([...tasks]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const go = useNavigate()

useEffect(() => {
    let filteredTasks = [...tasks];
    if (categoryFilter) {
      filteredTasks = filteredTasks.filter((task) => task.category === categoryFilter);
    }

    const sorted = filteredTasks.sort(
      (a, b) => moment(a.deadline).valueOf() - moment(b.deadline).valueOf()
    );
    setSortedTasks(sorted);
  }, [tasks, categoryFilter]);

  if (loading) return <p>Carregando tarefas...</p>;

 const priorityLabels: Record<string, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  in_progress: "Em andamento",
  done: "Feito",
};

const categoryLabels: Record<string, string> = {
  work: "Trabalho",
  personal: "Pessoal",
};

const redirectEditTask = (task: Task) => {
    go("/form", { state: { task } });
  };


  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Lista de Tarefas
      </h1>
      <div style={{ marginBottom: "1rem" }}>
        <CategoryFilter
          categories={["work", "personal"]}
          selectedCategory={categoryFilter}
          onChange={setCategoryFilter}
        />
        </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl shadow-sm"
            style={{
              padding: "1rem",
              backgroundColor: "#f9f9f9"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "1.2rem" }}>{task.title}</h2>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    backgroundColor:
                      task.priority === "high"
                        ? "#ef4444"
                        : task.priority === "medium"
                        ? "#facc15"
                        : "#6ee7b7",
                    color: "#fff",
                  }}
                >
                  {priorityLabels[task.priority]}
                </span>
                <PencilIcon
                  className=" w-4 cursor-pointer  text-[#10B981]"
                 onClick={() => redirectEditTask(task)}
                />
              </div>
            </div>

            <p style={{ margin: "0.2rem 0", color: "#666" }}>{categoryLabels[task.category]}</p>
            <p style={{ margin: "0.2rem 0" }}>
              Prazo: {moment(task.deadline).format("DD/MM/YYYY HH:mm")}
            </p>
            <p
              style={{
                margin: "0.2rem 0",
                color:
                  task.status === "done"
                    ? "green"
                    : task.status === "pending"
                    ? "orange"
                    : task.status === "in_progress"
                    ? "blue"
                    : "#333"
              }}
            >
              Status: {statusLabels[task.status]}
            </p>
            <TimeSuggestions taskId={task.id} suggestions={suggestions} />
          </div>
        ))}
      </div>
    </div>
  );
}
