import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home/Home";

import Signup from "./pages/Signup";

// import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
