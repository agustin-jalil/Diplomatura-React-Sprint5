import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

const Home = () => {
  return (
    <>
      <div className="recetas__container relative">
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

      <RecipeList />
    </>
  );
};

export default Home;
