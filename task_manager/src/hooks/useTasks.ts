import { useEffect, useState } from "react";
import api from "../services/api";


export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: string;
  estimated_duration: number;
  deadline: string;
  status: "pending" | "done";
}

export interface SuggestedTime {
  start: string;
  end: string;
  score: number;
}

export interface Suggestion {
  task_id: number;
  suggested_times: SuggestedTime[];
}

export  function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        setLoading(true)
        const tasksRes = new Promise((resolve, reject)=>{
            api
            .get('tasks')
            .then((res)=>{
                setTasks(res.data)
                setLoading(false)
                resolve(res.data)
            })
            .catch((err)=>{
                setError('Erro ao puxar tarefas')
                reject(err)
            })
        })

        const suggestionsRes = new Promise((resolve, reject)=>{
            api
            .get('suggestions')
            .then((res)=>{
                setSuggestions(res.data)
                setLoading(false)
                resolve(res.data)
            })
            .catch((err)=>{
                setError('Erro ao puxar sugestões')
                reject(err)
            })
        })

        Promise.all([tasksRes, suggestionsRes])
    }, [])

    return {
    tasks,
    suggestions,
    loading,
    error
  };
    
}