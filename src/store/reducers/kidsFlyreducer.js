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
  airportresponse: {
    results: {
      items: [
        {
          position: [35.43649, -82.53852],
          distance: 8149,
          title: "Asheville Regional Airport (AVL)",
          averageRating: 0.0,
          category: {
            id: "airport",
            title: "Airport",
            href:
              "https://places.ls.hereapi.com/places/v1/categories/places/airport?app_id=VzrNf0MKt1DkL6ELrV80&app_code=WmPKu38ynahhapyXrHr4QQ",
            type: "urn:nlp-types:category",
            system: "places",
          },
          icon:
            "https://download.vcdn.data.here.com/p/d/places2/icons/categories/40.icon",
          vicinity: "61 Terminal Dr<br/>Asheville, NC 28732",
          having: [],
          type: "urn:nlp-types:place",
          href:
            "https://places.ls.hereapi.com/places/v1/places/840dnm39-3f077280f9d14447926ce4a4a3b90812;context=Zmxvdy1pZD1kODU2NmU4Ny1iNTFlLTVkNDYtOGQwMi03YzQ1N2M4NzA1MTVfMTYwNDg2NTQyNTYxOV8wXzU2ODAmcmFuaz0w?app_id=VzrNf0MKt1DkL6ELrV80&app_code=WmPKu38ynahhapyXrHr4QQ",
          id: "840dnm39-3f077280f9d14447926ce4a4a3b90812",
        },
      ],
    },
    search: {
      context: {
        location: {
          position: [35.508689, -82.523053],
          address: {
            text: "12 Foxfire Dr<br/>Asheville, NC 28803<br/>USA",
            house: "12",
            street: "Foxfire Dr",
            postalCode: "28803",
            city: "Asheville",
            county: "Buncombe",
            stateCode: "NC",
            country: "United States",
            countryCode: "USA",
          },
        },
        type: "urn:nlp-types:place",
        href:
          "https://places.ls.hereapi.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPTEyK0ZveGZpcmUrRHI7bGF0PTM1LjUwODY4OTM7bG9uPS04Mi41MjMwNTMxO3N0cmVldD1Gb3hmaXJlK0RyO2hvdXNlPTEyO2NpdHk9QXNoZXZpbGxlO3Bvc3RhbENvZGU9Mjg4MDM7Y291bnRyeT1VU0E7c3RhdGVDb2RlPU5DO2NvdW50eT1CdW5jb21iZTtjYXRlZ29yeUlkPWJ1aWxkaW5nO3NvdXJjZVN5c3RlbT1pbnRlcm5hbA;context=c2VhcmNoQ29udGV4dD0x?app_id=VzrNf0MKt1DkL6ELrV80&app_code=WmPKu38ynahhapyXrHr4QQ",
      },
    },
  },
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
  nearestAirport: "",
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
      let {
        position,
        distance,
        title,
        icon,
        vicinity,
      } = action.payload.results.items[0];
      const airportPacket = { ...position, distance, title, icon, vicinity };
      return {
        ...state,
        isLoading: false,
        closestAirport: airportPacket,
      };
    }
    case "GETAIRPORTBYCOORDS_SUCCESS_NOLOCAL": {
      if (action.payload.results.length == 0)
        return {
          ...state,
          isLoading: false,
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
