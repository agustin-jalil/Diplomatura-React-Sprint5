import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RecipeList from "../pages/RecipeList";
import RecipeDetail from "../pages/RecipeDetail";
import RecipeCreate from "../pages/RecipeCreate";
import RecipeEdit from "../pages/RecipeEdit";
import NotFound from "../pages/NotFound";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/recipes" element={<RecipeList />} />
    <Route path="/recipes/create" element={<RecipeCreate />} />
    <Route path="/recipes/:id" element={<RecipeDetail />} />
    <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
