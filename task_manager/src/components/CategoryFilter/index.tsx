import type {FC} from "react";


type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
};


export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border rounded border-gray-300"
    >
      <option value="">Todas as categorias</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat === "work" ? "Trabalho" : cat === "personal" ? "Pessoal" : cat}
        </option>
      ))}
    </select>
  );
};