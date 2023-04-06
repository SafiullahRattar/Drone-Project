import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const MapContainer = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position: { coords: { latitude: any; longitude: any } }) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [navigator.geolocation]);

  console.log(currentPosition);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD6u2up80FVe-Vg0vg4K_9bZjkd_Wq6yPo">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
export default MapContainer;
