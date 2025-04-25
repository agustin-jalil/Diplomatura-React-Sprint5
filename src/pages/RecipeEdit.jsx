import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecipes } from "../context/RecipeContext";

const RecipeEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { updateRecipe } = useRecipes();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`https://YOUR-MOCKAPI-URL.com/recipes/${id}`);
      setForm({ title: res.data.title, description: res.data.description });
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRecipe(id, form);
    navigate("/recipes");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Receta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
