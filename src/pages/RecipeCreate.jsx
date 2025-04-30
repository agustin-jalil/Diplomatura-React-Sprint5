import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

const RecipeCreate = () => {
  const [form, setForm] = useState({ nombre: "", descripcion: "", imagen: "" });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { createRecipe } = useRecipes();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imagen: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion) return; // Aseguramos que los campos no estén vacíos

    try {
      // Llamamos a createRecipe desde el contexto para agregar la receta
      await createRecipe({
        title: form.nombre,
        description: form.descripcion,
        image: form.imagen,
      });

      // Redirigimos a la lista de recetas después de crear la receta
      navigate("/");
    } catch (error) {
      console.error("Error al crear receta", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Receta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la receta"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Subir imagen</label>
            <input
              type="text"
              placeholder="URL de la imagen"
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
            />
            {preview && (
              <img
                src={preview}
                alt="Previsualización"
                className="mt-3 rounded-md max-h-48 object-cover"
              />
            )}
          </div>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeCreate;
