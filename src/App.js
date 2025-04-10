import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FrontPage from "./components/search-page";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<FrontPage />} />
      </Routes>
    </div>
  );
}
