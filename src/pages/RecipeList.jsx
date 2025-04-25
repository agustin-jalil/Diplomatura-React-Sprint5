import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const { recipes } = useRecipes();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl">Recetas</h1>
        <Link to="/recipes/create" className="bg-blue-500 text-white px-4 py-2 rounded">Nueva receta</Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {recipes.map(r => <RecipeCard key={r.idMeal} recipe={r} />)}
      </div>
    </div>
  );
};

export default RecipeList;
