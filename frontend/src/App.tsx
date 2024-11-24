import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MangaPage from "./pages/MangaPage";
import ReadPage from "./pages/ReadPage";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Register from "./pages/Register";
import Login from "./pages/Login";



const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/" element={<Home />} />
          <Route path="/manga/:mangaId" element={<MangaPage />} />
          <Route path="/manga/:mangaId/read/:chapterId" element={<ReadPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
