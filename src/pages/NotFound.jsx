import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p>La ruta que intentás acceder no existe.</p>
      <Link to="/" className="text-blue-500 mt-4 block">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
