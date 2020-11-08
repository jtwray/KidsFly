import {
  GETALLTRIPS_SUCCESS,
  ADD_FLIGHT_SUCCESS,
  EDIT_FLIGHT_SUCCESS,
  DELETE_FLIGHT_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  LOGIN_STAFF_SUCCESS,
  APPLY_STAFF_SUCCESS,
  REGISTER_STAFF_SUCCESS,
  REGISTER_USER_SUCCESS,
  GETAIRPORTBYCOORDS_SUCCESS,
  START,
  ERROR,
} from "../actions";
import { Redirect } from "react-router-dom";

const initialState = {
  currentUser: "",
  isLoading: false,
  isAdmin: false,
  isStaff: false,
  isTraveler: false,
  isError: false,
  error: "",
  kidsConnectionApplications: [],
  credentials: { password: "", email: "" },
  incomingTravelersList: [],
  arrivedTravelersList: [],
  homeAirport: "",
  closestAirport: "",
  upcomingFlightsList: [],
  kidsConnectionStaffList: [],
};

const kidsFlyreducer = (state = initialState, action) => {
  switch (action.type) {
    case "START": {
      return { ...state, isLoading: true };
    }
    case "ERROR": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    case "APPLY_STAFF_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        kidsConnectionApplications: [
          ...state.kidsConnectionApplications,
          ...action.payload.credentials,
        ],
      };
    }
    case "ADD_FLIGHT_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        upcomingFlightsList: [
          ...state.upcomingFlightsList,
          action.payload.flightObj,
        ],
      };
    }
    case "EDIT_FLIGHT_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        upcomingFlightsList: [...state.upcomingFlightsList, action.payload],
      };
    }
    case "DELETE_FLIGHT_SUCCESS": {
      const { flightObj } = action.payload;

      return {
        ...state,
        isLoading: false,
        upcomingFlightsList: [
          ...state.upcomingFlightsList.filter((trip) => trip !== flightObj),
        ],
      };
    }
    case "GETALLTRIPS_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        upcomingFlightsList: [...action.payload],
      };
    }
    case "GETAIRPORTBYCOORDS_SUCCESS": {
      const { payload } = action;
      console.log(
        { payload },
        "line 101 reducer case getairportbycoords_success"
      );
      return {
        ...state,
        isLoading: false,
        closestAirport: [action.payload],
      };
    }
    case "LOGIN_USER_SUCCESS": {
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        currentUser: action.payload.userid,
        welcome: action.payload.message,
      };
    }
    case "LOGOUT": {
      window.localStorage.removeItem(`token`);

      return {
        ...state,
        isLoading: false,
        currentUser: null,
        token: null,
      };
    }
    case "LOGIN_STAFF_SUCCESS": {
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        currentUser: action.id || action.username,
      };
    }
    case "REGISTER_USER_SUCCESS": {
      const { token } = action.payload;
      window.localStorage.setItem("token", token);
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        currentUser: action.payload.saved.id || "noneyet",
      };
    }
    case "REGISTER_STAFF_SUCCESS": {
      const { token } = action.payload;
      window.localStorage.setItem("token", token);

      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        currentUser: action.payload.id,
      };
    }
    default:
      return { ...state };
  }
};

export default kidsFlyreducer;
