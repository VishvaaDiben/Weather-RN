import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/owfont-master/css/owfont-regular.css";
var moment = require("moment");

export default function DayCard({ reading }) {
  //Destructure the data and populate
  let newDate = new Date(); //get current time
  //   const weekday = reading.dt * 1000;
  //   newDate.setTime(weekday);

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;

  return (
    <div className="col-sm-2">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Today</h3>
          <p className="text-muted">
            {moment(newDate).format("ddd, Do MMM YYYY, h:mm a")}
          </p>
          <i className={imgURL}></i>
          <h2>{Math.round(reading.main.temp)} °C</h2>
          <div className="card-body">
            <p className="card-text">{reading.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
