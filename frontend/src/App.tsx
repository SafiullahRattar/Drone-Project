import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./component/Header";
import UsersList from "./pages/Admin/Users/UsersList";
import DeliveryForm from "./pages/Delivery/DeliveryForm";
import DeliveryList from "./pages/Delivery/DeliveryList";
import DeliveryTracking from "./pages/Delivery/DeliveryTracking";
import Home from "./pages/Home/Home";

import Signup from "./pages/Signup";

// import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <main className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/delivery" element={<DeliveryForm />} />
          <Route path="/tracking" element={<DeliveryTracking />} />
          <Route path="/tracking/:id" element={<DeliveryTracking />} />
          <Route path="/profile" element={<DeliveryList />} />
          <Route path="/admin/users" element={<UsersList />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
