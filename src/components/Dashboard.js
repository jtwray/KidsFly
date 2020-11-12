import React, { useState, useEffect } from "react";
import { usePosition } from "../hooks/usePosition";
import { connect } from "react-redux";
import {
  getAirportByCoords,
  editFlight,
  fetchTrips,
  addFlight,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import TripForm from "./Toggle";
import MyTrips from "../components/Trips/MyTrips";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import NearestAirport from "./Trips/NearestAirport";

const Dash = ({
  message,
  upcomingFlightsList,
  getAirportByCoords,
  fetchTrips,
  addFlight,
  editFlight,
}) => {
  const history = useHistory();

  const initialAirport = { name: "", distance: "" };
  const [latitude, longitude, accuracy] = usePosition();
  const [gps, setGps] = useState(latitude, longitude, accuracy);

  const [airport, setAirport] = useState({ initialAirport });

  console.log(
    "AFTERcustomhook",
    "latitude,longitude,accuracy",
    latitude,
    longitude,
    accuracy,
    { gps }
  );

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    setGps({ latitude, longitude, accuracy });
  }, [latitude, longitude, accuracy]);

  return (
    <div className="dashContainer">
      <div className="dashHeader">
        <h2>{message}</h2>

        <p>Below you will find any trips that you have coming up</p>
      </div>
      <div className="tripContainer">
        <h3>Trips</h3>
        {gps != undefined && <NearestAirport gps={gps} />}
        <button onClick={() => getAirportByCoords(latitude, longitude)}>
          getairport
        </button>
        <button onClick={() => fetchTrips()}>gettrips</button>
        <MyTrips upcomingFlightsList={upcomingFlightsList} history={history} />
        <TripForm />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.welcome,
    upcomingFlightsList: state.upcomingFlightsList,
  };
};

export default connect(mapStateToProps, {
  getAirportByCoords,
  fetchTrips,
  addFlight,
  editFlight,
})(Dash);
