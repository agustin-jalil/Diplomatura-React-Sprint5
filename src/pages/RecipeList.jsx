import { useState, useMemo } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const RecipeList = () => {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);

  // Categorías únicas
  const categories = useMemo(() => {
    const allCategories = recipes.map((r) => r.strCategory);
    return ["Todas", ...new Set(allCategories)];
  }, [recipes]);

  // Filtrar por nombre y categoría
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.strMeal
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todas" || recipe.strCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, selectedCategory]);

  // Paginar resultados filtrados
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  // Reiniciar página al filtrar
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Recetas</h1>
        <Link to="/recipes/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Nueva receta
        </Link>
      </div> */}

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        {/* Input con icono */}
        <div className="relative w-full md:w-1/2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar receta por nombre..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full rounded-lg border bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 shadow-sm"
          />
        </div>

        {/* Botón para limpiar (opcional) */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all duration-200 shadow-sm border border-red-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Limpiar búsqueda
          </button>
        )}
      </div>

      {/* Lista de recetas */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {paginatedRecipes.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>

      {/* Paginado */}
      <div className="flex justify-center my-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1 rounded-md border border-gray-300 text-sm cursor-pointer transition-colors duration-200
        ${
          currentPage === i + 1
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
