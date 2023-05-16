import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./CustomLocation.scss";

interface Iprops {
  setPickUpLocation: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | null>
  >;
  setDropOffLocation: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | null>
  >;
  setFormDistance: React.Dispatch<React.SetStateAction<number>>;
}

const CustomLocation: React.FC<Iprops> = ({
  setDropOffLocation,
  setPickUpLocation,
  setFormDistance,
}) => {
  const google = window.google;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pickUp, setPickUp] = useState<google.maps.LatLngLiteral | null>({
    lat: 33.642362142043844,
    lng: 72.99006168363474,
  });
  const [dropOff, setDropOff] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [distance, setDistance] = useState<string | null>(null);

  const [showPicupInfo, setShowPickupInfo] = useState<boolean>(false);
  const [showDropOffInfo, setShowDropOffInfo] = useState<boolean>(false);

  // const handleLoad = (map: GoogleMap) => {
  //   setMap(map);
  // };

  // const handlePickUpClick = (event) => {
  //   setPickUp({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  // };

  // const handleDropOffClick = (event) => {
  //   setDropOff({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  // };
  const { isLoaded, loadError } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_SECRET}`,
  });

  useEffect(() => {
    if (pickUp && dropOff) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickUp],
          destinations: [dropOff],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const { distance } = response?.rows[0]?.elements[0] || {
              text: null,
            };
            if (distance) {
              setDistance(distance.text);
              setFormDistance(distance.value);
            }
          }
        }
      );
    }
    console.log({
      pickUp,
      dropOff,
      distance,
    });
  }, [pickUp, dropOff]);

  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral>({
      lat: 33.642362142043844,
      lng: 72.99006168363474,
    });

  // useEffect(() => {
  //   console.log(currentPosition);
  // }, [currentPosition]);

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  return isLoaded ? (
    <div>
      <GoogleMap
        onLoad={(map) => setMap(map)}
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={15}
        center={currentPosition}
      >
        <div className="marker"></div>
        {pickUp && (
          <Marker
            position={pickUp}
            onClick={(event: google.maps.MapMouseEvent) => {
              event.stop();
              // setPickUp(null);
              // setPickUpLocation(null);
              // setDistance(null);
              // setFormDistance(0);
              setShowPickupInfo(!showPicupInfo);
            }}
          >
            {showPicupInfo && (
              <InfoWindow position={pickUp}>
                <div>
                  <p>Pick-up Location</p>
                  <p>{`${pickUp.lat}, ${pickUp.lng}`}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
        {dropOff && (
          <Marker
            position={dropOff}
            onClick={(event: google.maps.MapMouseEvent) => {
              event.stop();
              // setDropOff(null);
              // setDropOffLocation(null);
              // setDistance(null);
              // setFormDistance(0);
              setShowDropOffInfo(!showDropOffInfo);
            }}
          >
            {showDropOffInfo && (
              <InfoWindow position={dropOff}>
                <div>
                  <p>Drop-off Location</p>
                  <p>{`${dropOff.lat}, ${dropOff.lng}`}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
      <div className="form">
        {/* <div className="form__element">
          <label>Pick-up Location:</label>
          <button
            onClick={() => {
              if (map) {
                const center = map.getCenter();
                if (center) {
                  setPickUp({ lat: center.lat(), lng: center.lng() });
                  setPickUpLocation({ lat: center.lat(), lng: center.lng() });
                  setCurrentPosition({ lat: center.lat(), lng: center.lng() });
                }
              }
            }}
          >
            Use Current Location
          </button>
          {pickUp && (
            <div>
              <span>Click Marker to remove location</span>
              <p>{`${pickUp.lat}, ${pickUp.lng}`}</p>
            </div>
          )}
        </div> */}
        <div className="form__element">
          <label>Drop-off Location:</label>
          <button
            onClick={() => {
              if (map) {
                const center = map.getCenter();
                if (center) {
                  setDropOff({ lat: center.lat(), lng: center.lng() });
                  setDropOffLocation({ lat: center.lat(), lng: center.lng() });
                  setCurrentPosition({ lat: center.lat(), lng: center.lng() });
                }
              }
            }}
          >
            Use Current Location
          </button>
          {dropOff && (
            <div>
              <span>Click Marker to remove location</span>
              <p>{`${dropOff.lat}, ${dropOff.lng}`}</p>
            </div>
          )}
        </div>
        <div className="form__element">
          <label>Distance:</label>
          <span>{distance}</span>
        </div>
      </div>
    </div>
  ) : (
    <>Loading Maps...</>
  );
};

export default React.memo(CustomLocation);
