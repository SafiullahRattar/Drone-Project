import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import DeliveryForm from "./pages/Delivery/DeliveryForm";
import DeliveryList from "./pages/Delivery/DeliveryList";
import DeliveryTracking from "./pages/Delivery/DeliveryTracking";
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
          <Route path="/delivery" element={<DeliveryForm />} />
          <Route path="/tracking" element={<DeliveryTracking />} />
          <Route path="/tracking/:id" element={<DeliveryTracking />} />
          <Route path="/profile" element={<DeliveryList />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
