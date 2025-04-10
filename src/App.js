// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import FrontPage from "./components/search-page.js"; // <-- Ensure this exists

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/search" element={<FrontPage />} />
    </Routes>
  );
}
