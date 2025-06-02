import { Link } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Lista de Tarefas", path: "/list" },
  { name: "Nova Tarefa", path: "/form" },
];

export default function Sidebar() {

  return (
    <aside className="w-64 min-h-screen bg-[#6366F1] text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciador de Tarefas</h1>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, path }) => {
          return (
            <Link
              key={path}
              to={path}
              className='px-4 py-2 rounded transition font-medium bg-white text-[#6366F1]'
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
