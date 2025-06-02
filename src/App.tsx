import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './screens/Dashboard';
import TaskForm from "./screens/TaskForm";
import TaskList from "./screens/TaskList";
import Sidebar from "./components/Sidebar";
import './App.css'

function App() {

  return (
     <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-[#F9FAFB]">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form" element={<TaskForm />} />
            <Route path="/list" element={<TaskList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
