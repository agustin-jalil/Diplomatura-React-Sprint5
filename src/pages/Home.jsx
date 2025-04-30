import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import axios from "axios";

const Home = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(API_URL); // Solicitud a la API correcta
        setRecipes(response.data);
        console.log("Recetas cargadas:", response.data); // Imprime las recetas en consola
      } catch (error) {
        console.error("Error al cargar las recetas", error);
      }
    };

    fetchRecipes();
  }, []); // Solo se ejecuta una vez al cargar el componente

  return (
    <>
      <div className="recetas__container relative">
        <header className="absolute top-0 left-0 right-0 flex justify-between p-4 bg-transparent text-white">
          <div className="flex items-center justify-center gap-4 text-center z-4">
            <img src="/resto.svg" alt="Logo" className="w-12 h-12" />
            <h1 className="text-white text-2xl">Recetas App</h1>
          </div>
          <nav className="relative z-10">
            <ul className="flex gap-4 text-white z-4">
              <li>
                <Link to="/recipes">
                  Recetas
                </Link>
              </li>
              <li>
                <Link to="/recipes/create">
                  Crear
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <video
          className="recetas__header"
          src="https://cdn.pixabay.com/video/2024/08/18/227134_large.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="overlay"></div>

        <div className="text-center container mx-auto recetas__contenido">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Bienvenido a RecetasApp 🍽️
          </h1>
          <p className="mb-6 text-white">
            Descubrí, creá y gestioná tus recetas favoritas.
          </p>
        </div>
      </div>

      <RecipeList recipes={recipes} /> {/* Pasamos las recetas a RecipeList */}
    </>
  );
};

export default Home;
