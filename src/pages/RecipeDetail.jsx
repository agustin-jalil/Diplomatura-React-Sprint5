import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(res.data.meals[0]);
      } catch (err) {
        console.error("Error al cargar receta", err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w[300px] rounded-md mb-4"
      />
      <p className="mb-4 text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ingredientes:</h2>
      <ul className="list-disc list-inside">
        {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
          const ingredient = recipe[`strIngredient${i}`];
          const measure = recipe[`strMeasure${i}`];
          return (
            ingredient && ingredient.trim() !== "" && (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>

      <Link to="/recipes" className="text-blue-500 mt-6 block">← Volver al listado</Link>
    </div>
  );
};

export default RecipeDetail;
