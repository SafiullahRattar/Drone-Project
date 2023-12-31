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
import PathList from "./pages/Admin/Paths/PathList";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/deliveries" element={<AdminDeliveryList />} />
          <Route path="/admin/drones" element={<AdminDroneList />} />
          <Route path="/admin/editForm" element={<AdminEditForm />} />
          {/* <Route path="/admin/path" element={<DroneAnimation />} /> */}
          <Route path="/admin/path" element={<PathList />} />
          <Route path="/admin/animation" element={<DroneAnimation />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
