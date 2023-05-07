import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./component/Header";
import AdminEditForm from "./pages/Admin/AdminEditForm";
import AdminDeliveryList from "./pages/Admin/Delivery/DeliveryList";
import UsersList from "./pages/Admin/Users/UsersList";
import DeliveryForm from "./pages/Delivery/DeliveryForm";
import DeliveryTracking from "./pages/Delivery/DeliveryTracking";
import Home from "./pages/Home/Home";
import DroneAnimation from "./pages/Admin/Animation";

import Signup from "./pages/Signup";
import AdminDroneList from "./pages/Admin/Drone/DroneList";
import Profile from "./pages/Profile/Profile";
import Test from "./Test";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/deliveries" element={<AdminDeliveryList />} />
          <Route path="/admin/drones" element={<AdminDroneList />} />
          <Route path="/admin/editForm" element={<AdminEditForm />} />
          <Route path="/test" element={<DroneAnimation />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
