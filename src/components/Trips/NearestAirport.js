import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { getAiportByCoords } from "../../store/actions";
import { Redirect } from "react-router-dom"
import axios from 'axios'
import { axiosWithAuth } from "../../utils";

const NearestAirport = props => {

    const initialAirport = { name: "", distance: "" };
    const [airport, setAirport] = useState({ initialAirport });
    const [position, setPosition] = useState();

    const success = (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        console.log(`More or less ${accuracy} meters.`);

        setPosition({ latitude: latitude, longitude: longitude, accuracy: accuracy })
        return (console.log("position", position))
    }

    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };



    const browserCoordsII = () => {
        navigator.geolocation.getCurrentPosition(success, error, options);
        //returns the browser coordinates for the airport by distance api as object position{}
     }
     browserCoordsII();
useEffect(()=>{


},[])
    
    
    const getAiportByCoords = (position) =>  {
        
        axios
        .get(`https://aerodatabox.p.rapidapi.com/airports/search/location/${position.latitude}/${position.longitude}/mi/50/16`)
        .then(res =>setAirport(res.data))
        .catch(err => console.error( err.response))
        
    }
// position&&answer()
//     const answer = async () => {
//         // const position = await browserCoordsII()
//         const airport = await getnearestAirport(position)
//         setAirport(airport)
//         console.log("airport", airport)

//     }
 
//     const getnearestAirport = (position) => {
//         const { latitude, longitude } = position;
//         const getAirportByCoords = (latitude, longitude) => {
//             (localStorage.getItem("token")) ?
//                 (axios
//                     .get(`https://aerodatabox.p.rapidapi.com/airports/search/location/${longitude}/${latitude}/km/100/16`)
//                     .then(res => console.log(res))
//                     .catch(err => console.error(err))) : (Redirect("/login"))
//         };
//         return getAirportByCoords(latitude, longitude);
//     };
    return (
        <>
            <div>nearest Airport{airport[0]}</div>
        </>

    );
};
const mapStateToProps = state => {
    return { nearestAirport: state.neartestAirport };
};

const mapDispatchToProps = dispatch => {
    return { dispatch, ...bindActionCreators({}, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(NearestAirport);
