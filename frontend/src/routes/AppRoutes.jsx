import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import SportCategoryPage from "../pages/SportCategoryPage.jsx";
import EventDetailPage from "../pages/EventDetailPage.jsx";
// import NotFoundPage from "../pages/NotFoundPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sports/:sport" element={<SportCategoryPage />} />
      <Route path="/matches/:id" element={<EventDetailPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
