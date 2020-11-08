import { useEffect, useState } from "react";

export function usePosition() {
  let error, options, success;
const [position,setPosition]=useState()
let latitude,longitude;
  success = (positionObj) => {
    const { latitude, longitude, accuracy } = positionObj.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`More or less ${accuracy} meters.`);
    
    return [latitude, longitude];
  };

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  function getBrowserCoords(success, error, options) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    return [latitude,longitude]
  }

  useEffect(() => {
    let [latitude,longitude]=getBrowserCoords(success, error, options);
    return [latitude,longitude]
  }, []);

  return [latitude, longitude];
}
