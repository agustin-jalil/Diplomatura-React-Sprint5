import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

const RecipeEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ nombre: "", descripcion: "", imagen: "" });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { updateRecipe, getRecipeById } = useRecipes();  // Utilizamos la función de contexto para actualizar

  // Fetch de la receta para editarla
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); // 👈 Usar el useContext
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          imagen: data.imagen || "",
        });
        setPreview(data.imagen || null);
      } catch (error) {
        console.error("Error al cargar la receta", error);
      }
    };
    fetchRecipe();
  }, [id, getRecipeById]);

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
    if (!form.nombre || !form.descripcion) return; // Validación simple
  
    try {
      await updateRecipe(id, form); // 👈 Esperamos que se actualice correctamente
      navigate("/"); // 👈 Redirigimos a la lista después de éxito
    } catch (error) {
      console.error("Error al actualizar receta", error);
      toast.error("Error al actualizar receta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Receta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la receta"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Actualizar imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Previsualización"
                className="mt-3 rounded-md max-h-48 object-cover"
              />
            )}
          </div>
          <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-200">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeEdit;
