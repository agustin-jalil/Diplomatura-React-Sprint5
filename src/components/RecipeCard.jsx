import { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from '../pages/Modal';

const RecipeCard = ({ recipe }) => {
  const { deleteRecipe } = useRecipes();
  const [isModalOpen, setModalOpen] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState(null);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta receta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        deleteRecipe(recipe.idMeal);
      }
    });
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      setDetailedRecipe(res.data.meals[0]);
      setModalOpen(true);
    } catch (err) {
      console.error("Error al cargar detalles de la receta", err);
    }
  };

  return (
    <>
      <div className="border p-4 rounded-xl shadow-md">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-600">Receta de mariscos deliciosa y fácil de preparar.</p>
        <div className="flex gap-4 mt-2">
          <button onClick={handleOpenModal} className="text-blue-500">Ver</button>
          <button className="text-yellow-500" disabled>Editar</button>
          <button onClick={handleDelete} className="text-red-500">Eliminar</button>
        </div>
      </div>

      {/* Modal con detalles de la receta */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {detailedRecipe ? (
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <h2 className="text-xl font-bold mb-2">{detailedRecipe.strMeal}</h2>
            <div className='ingredientes'>
              <img src={detailedRecipe.strMealThumb} alt={detailedRecipe.strMeal} className="w[300px] rounded-md mb-4" />
              <div className='ingredientes_descripcion'>
                <h3 className="font-semibold mt-4 mb-1">Ingredientes:</h3>
                <ul className="list-disc list-inside text-sm">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                    const ingredient = detailedRecipe[`strIngredient${i}`];
                    const measure = detailedRecipe[`strMeasure${i}`];
                    return (
                      ingredient && ingredient.trim() !== '' && (
                        <li key={i}>
                          {ingredient} - {measure}
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{detailedRecipe.strInstructions}</p>


          </div>
        ) : (
          <p>Cargando receta...</p>
        )}
      </Modal>

    </>
  );
};

export default RecipeCard;
