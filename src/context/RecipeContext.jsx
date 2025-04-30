import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

// NUEVO API_URL de MockAPI
const API_URL = import.meta.env.VITE_API_URL;

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(API_URL);
      setRecipes(res.data || []);
    } catch (error) {
      toast.error("Error al cargar recetas");
    }
  };

  const createRecipe = async (recipe) => {
    try {
      const newRecipe = {
        nombre: recipe.title,
        descripcion: recipe.description,
        imagen: recipe.image || "https://via.placeholder.com/150",
      };
      const res = await axios.post(API_URL, newRecipe);
      setRecipes(prev => [...prev, res.data]);
      toast.success("Receta creada");
    } catch (error) {
      toast.error("Error al crear receta");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRecipes(prev => prev.filter(r => r.id !== id));
      toast.success("Receta eliminada");
    } catch (error) {
      toast.error("Error al eliminar receta");
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        nombre: updatedRecipe.nombre,       // <-- nombre correcto
        descripcion: updatedRecipe.descripcion, // <-- descripcion correcto
        imagen: updatedRecipe.imagen,       // <-- imagen correcto
      });
      setRecipes(prev => prev.map(r => r.id === id ? res.data : r));
      toast.success("Receta actualizada");
    } catch (error) {
      toast.error("Error al actualizar receta");
    }
  };
  

  const getRecipeById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error al cargar receta");
      throw error;
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
<RecipeContext.Provider value={{ recipes, fetchRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipeById }}>

      {children}
    </RecipeContext.Provider>
  );
};
