import React from "react";
import "bootstrap/dist/css/bootstrap.css";
var moment = require("moment");

export default function DayCard({ reading }) {
//Destructure the data and populate
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;

  return (
    <div className="col-sm-2">
      <div className="card">
        <div class="card-body">
          <h3 className="card-title">{moment(newDate).format("ddd")}</h3>
          <p className="text-muted">
            {moment(newDate).format("Do MMM YYYY, h:mm a")}
          </p>
          <i className={imgURL}></i>
          <h2>{Math.round(reading.main.temp)} °F</h2>
          <div className="card-body">
            <p className="card-text">{reading.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
