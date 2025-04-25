import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

const RecipeCreate = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { createRecipe } = useRecipes();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    await createRecipe(form);
    navigate("/recipes");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Receta</h1>
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
};

export default RecipeCreate;
