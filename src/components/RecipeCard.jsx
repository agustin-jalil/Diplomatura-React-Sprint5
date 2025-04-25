import { useState, useEffect } from "react";
import { useRecipes } from "../context/RecipeContext";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../pages/Modal";

const RecipeCard = ({ recipe }) => {
  const { deleteRecipe } = useRecipes();
  const [isModalOpen, setModalOpen] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState(null);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta receta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(recipe.idMeal);
      }
    });
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      );
      setDetailedRecipe(res.data.meals[0]);
      setModalOpen(true);
    } catch (err) {
      console.error("Error al cargar detalles de la receta", err);
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white text-black shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] cursor-pointer">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <div className="p-2 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
          <p className="text-sm text-gray-600">
            Receta deliciosa y fácil de preparar.
          </p>
          <div className="flex justify-around gap-4 mt-2">
            <button
              onClick={handleOpenModal}
              className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded cursor-pointer transition"
            >
              Ver
            </button>

            <button
              className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded cursor-not-allowed opacity-60"
              disabled
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-100 px-3 py-1 rounded cursor-pointer transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal con detalles de la receta */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {detailedRecipe ? (
          <div className="max-h-[80vh] overflow-y-auto pr-2 text-black">
            <h2 className="text-xl font-bold mb-2 text-black">
              {detailedRecipe.strMeal}
            </h2>
            <div className="ingredientes">
              <img
                src={detailedRecipe.strMealThumb}
                alt={detailedRecipe.strMeal}
                className="w[300px] rounded-md mb-4"
              />
              <div className="ingredientes_descripcion">
                <h3 className="font-semibold mb-1">Ingredientes:</h3>
                <ul className="text-sm text-black space-y-1">
                  {Array.from({ length: 6 }, (_, i) => i + 1).map((i) => {
                    const ingredient = detailedRecipe[`strIngredient${i}`];
                    const measure = detailedRecipe[`strMeasure${i}`];
                    return (
                      ingredient &&
                      ingredient.trim() !== "" && (
                        <li key={i} className="flex items-start gap-2">
                          <span>🍽️</span>
                          <span>
                            {ingredient} - {measure}
                          </span>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {detailedRecipe.strInstructions}
            </p>
          </div>
        ) : (
          <p>Cargando receta...</p>
        )}
      </Modal>
    </>
  );
};

export default RecipeCard;
