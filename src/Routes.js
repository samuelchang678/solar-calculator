import { Routes, Route } from "react-router-dom";
// import { homePage,accountSummary } from "./pages"
import { HomePage } from "./pages/homePage";
import { PrintPage } from "./pages/printPage";

export const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/print" element={<PrintPage />} />
    </Routes>
  );
};
