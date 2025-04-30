import { useState } from "react";
import { useNavigate } from "react-router-dom";  // 👈 Importar esto
import { useRecipes } from "../context/RecipeContext";
import Swal from "sweetalert2";
import Modal from "../pages/Modal";

const RecipeCard = ({ recipe }) => {
  const { deleteRecipe, getRecipeById } = useRecipes();
  const [isModalOpen, setModalOpen] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const navigate = useNavigate(); // 👈 Inicializar navigate

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
        deleteRecipe(recipe.id);
      }
    });
  };

  const handleOpenModal = async () => {
    try {
      const data = await getRecipeById(recipe.id);
      setDetailedRecipe(data);
      setModalOpen(true);
    } catch (err) {
      console.error("Error al cargar detalles de la receta", err);
    }
  };

  const handleEdit = () => {
    navigate(`/recipes/${recipe.id}/edit`); // 👈 Redirigir a editar receta
  };

  return (
    <>
      <div className="rounded-xl bg-white text-black shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] cursor-pointer">
        <img
          src={recipe.imagen}
          alt={recipe.nombre}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <div className="p-2 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{recipe.nombre}</h2>
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

            {/* Botón EDITAR ahora habilitado */}
            <button
              onClick={handleEdit}
              className="text-yellow-600 hover:bg-yellow-100 px-3 py-1 rounded cursor-pointer transition"
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

      {/* Modal de detalles */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {detailedRecipe ? (
          <div className="max-h-[80vh] overflow-y-auto pr-2 text-black">
            <h2 className="text-xl font-bold mb-2 text-black">
              {detailedRecipe.nombre}
            </h2>
            <div className="ingredientes">
              <img
                src={detailedRecipe.imagen}
                alt={detailedRecipe.nombre}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <div className="ingredientes_descripcion">
                <h3 className="font-semibold mb-1">Descripción:</h3>
                <p className="text-sm text-black">
                  {detailedRecipe.descripcion}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando receta...</p>
        )}
      </Modal>
    </>
  );
};

export default RecipeCard;
