import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(API_URL);
      setRecipes(res.data.meals || []);
    } catch (error) {
      toast.error("Error al cargar recetas");
    }
  };

  const createRecipe = async (recipe) => {
    try {
      const res = await axios.post(API_URL, recipe);
      setRecipes([...recipes, res.data]);
      toast.success("Receta creada");
    } catch (err) {
      toast.error("Error al crear receta");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRecipes(recipes.filter(r => r.id !== id));
      toast.success("Receta eliminada");
    } catch (err) {
      toast.error("Error al eliminar receta");
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedRecipe);
      setRecipes(recipes.map(r => r.id === id ? res.data : r));
      toast.success("Receta actualizada");
    } catch (err) {
      toast.error("Error al actualizar receta");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, createRecipe, deleteRecipe, updateRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
