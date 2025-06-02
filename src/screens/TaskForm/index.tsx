import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

type TaskFormInputs = {
  id?: number;
  title: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  estimated_duration: number;
  deadline: string;
  status: "pending" | "in_progress" | "done";
};

export const TaskForm: React.FC = () => {
  const { state } = useLocation();
  const task = state?.task as TaskFormInputs | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormInputs>({
    defaultValues: task,
  });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      console.log(data)
      if (data.id) {
        await api.put(`tasks/${data.id}`, data);
      } else {
        await api.post("tasks", data);
      }
      alert(`Tarefa ${data.id? 'atualizada':'inserida'} com sucesso !`);
      window.location.href = "/list"
    //  Swal.fire({
    //    title: `Tarefa ${data.id? 'atualizada':'inserida'} com sucesso !`,
    //    icon:"success",
    //    timer: 5000, 
    //    confirmButtonText: "OK",
    //    timerProgressBar: true,
    //  }).then((result) => {
    //  if (result.isConfirmed) {
    //    //window.location.href = "/list";
    //  } 
    //})
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar tarefa.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      <div>
        <label className="block font-semibold mb-1" htmlFor="title">
          Título *
        </label>
        <input
          id="title"
          {...register("title", { required: "Título é obrigatório" })}
          className={`w-full px-3 py-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Título da tarefa"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Descrição da tarefa"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="category">
          Categoria *
        </label>
        <select
          id="category"
          {...register("category", { required: "Categoria é obrigatória" })}
          className={`w-full px-3 py-2 border rounded ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue={task?.category ?? ""}
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          <option value="work">Trabalho</option>
          <option value="personal">Pessoal</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="priority">
          Prioridade *
        </label>
        <select
          id="priority"
          {...register("priority", { required: "Prioridade é obrigatória" })}
          className={`w-full px-3 py-2 border rounded ${
            errors.priority ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecione</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">
            {errors.priority.message}
          </p>
        )}
      </div>

      <div>
        <label
          className="block font-semibold mb-1"
          htmlFor="estimated_duration"
        >
          Duração estimada (minutos) *
        </label>
        <input
          type="number"
          id="estimated_duration"
          {...register("estimated_duration", {
            required: "Duração é obrigatória",
            min: { value: 1, message: "Mínimo 1 minuto" },
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.estimated_duration
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="60"
          min={1}
        />
        {errors.estimated_duration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.estimated_duration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="deadline">
          Prazo *
        </label>
        <input
          type="datetime-local"
          id="deadline"
          {...register("deadline", { required: "Prazo é obrigatório" })}
          className={`w-full px-3 py-2 border rounded ${
            errors.deadline ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.deadline && (
          <p className="text-red-500 text-sm mt-1">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="status">
          Status *
        </label>
        <select
          id="status"
          {...register("status", { required: "Status é obrigatório" })}
          className={`w-full px-3 py-2 border rounded ${
            errors.status ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecione</option>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em progresso</option>
          <option value="done">Concluída</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#10B981] w-full text-[#1F2937] font-semibold rounded px-4 py-2 shadow hover:shadow-md transition"
      >
        {isSubmitting ? "Salvando..." : "Salvar tarefa"}
      </button>
    </form>
  );
};

export default TaskForm;
