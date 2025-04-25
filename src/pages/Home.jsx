import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a RecetasApp 🍽️</h1>
      <p className="mb-6">Descubrí, creá y gestioná tus recetas favoritas.</p>
      <Link to="/recipes" className="bg-green-600 text-white px-4 py-2 rounded">Ver Recetas</Link>
    </div>
  );
};

export default Home;
