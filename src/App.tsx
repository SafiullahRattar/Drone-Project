import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";

import Signup from "./pages/Signup";

// import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
