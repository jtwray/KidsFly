import React, { useState, useEffect,useMemo } from "react";
import { connect } from "react-redux";
import { getAirportByCoords } from "../../store/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from "../../utils";
import "./NearestAirport.css";

let tooltip, tooltiptext;
tooltip = {
  position: ` relative`,
  display: `inline-block`,
  borderBottom: ` 1px dotted black`,
  "&:hover .tooltiptext": { visibility: "visible" },
  /* If you want dots under the hoverable text */
};

/* Tooltip text */
// .tooltip
tooltiptext = {
  visibility: `hidden`,
  width: `120px`,
  backgroundColor: `black`,
  color: `#fff`,
  textAlign: `center`,
  padding: `5px 0`,
  borderRadius: `6px`,

  /* Position the tooltip text - see examples below! */
  position: `absolute`,
  zIndex: 1,
};

/* Show the tooltip text when you mouse over the tooltip container */

const NearestAirport = ({gps,nearestAirport}) => {

  
  let {latitude,longitude}=gps;
  const initialAirport = { name: "", distance: "" };
  const [airport, setAirport] = useState({ initialAirport });
console.log({latitude},{longitude})
  useEffect(() => {
    if (latitude!=undefined) {console.log({latitude},{longitude});
      getAirportByCoords(latitude, longitude);

    }
  }, [ latitude]);

  if (!nearestAirport) {
    return <div>gps disabled</div>;
  }
  if (nearestAirport) {
    let { position, distance, title, icon, vicinity } =  nearestAirport;

    return (
      <div>
        <div>
          <h2>
            nearest Airport{title} is {distance} meters from your current
            location
            <div class="tooltip">
              Hover over me
              <span class="tooltiptext">{position}Tooltip text</span>
            </div>
          </h2>
          <address>
            {title}
            <br />
            {vicinity}
          </address>
          <img src={icon} alt={title} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { nearestAirport: state.closestAirport };
};

export default connect(mapStateToProps, { getAirportByCoords })(NearestAirport);
