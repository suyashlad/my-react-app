import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FrontPage from "./components/search-page";
import SearchResult from "./components/search-result";
import Dashboard from "./components/dashboard1";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<FrontPage />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  );
}
