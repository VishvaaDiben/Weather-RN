import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { apiConfig } from "./apiKeys";
import DayCard from "./DayCard";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullData: [],
      dailyData: []
    };
  }

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData
          },
          () => console.log(this.state)
        );
      });
  };

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayCard reading={reading} key={index} />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Simple Weather App</Text>
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <h5 className="display-5 text-muted">Kuala Lumpur, MY</h5>
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
