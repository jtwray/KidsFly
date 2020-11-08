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

const Dash = ({ message, dispatch, upcomingFlightsList }) => {
  const history = useHistory();
  const [latitude, longitude] = usePosition();

  const initialAirport = { name: "", distance: "" };
  const [airport, setAirport] = useState({ initialAirport });

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  return (
    <div className="dashContainer">
      <div className="dashHeader">
        <h2>{message}</h2>
        <p>Below you will find any trips that you have coming up</p>
      </div>
      <div className="tripContainer">
        <h3>Trips</h3>
        <NearestAirport getairport={dispatch(getAirportByCoords({latitude,longitude}))} />
        <button onClick={() => dispatch(getAirportByCoords(position))}>
          getairport
        </button>
        <button onClick={() => dispatch(fetchTrips())}>gettrips</button>
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

export default connect(mapStateToProps)(Dash);
