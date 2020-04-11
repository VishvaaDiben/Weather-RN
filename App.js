import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { apiConfig } from "./apiKeys";
import DayCard from "./DayCard";
import TodayCard from "./TodayCard";
var moment = require("moment");

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullData: [],
      dailyData: [],
      today: [],
      isLoading: true,
      dataLoading: true
    };
  }

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=50450&units=metric&APPID=${apiConfig}`;

    fetch(weatherURL)
      //Error handling using promises
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          this.setState({ isLoading: false });
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData,
            today: dailyData[0],
            dataLoading: false
          },
          () => console.log(this.state)
        );
        // this.setState(prevState => ({
        //   value: prevState.value + 1
        // }));
      });
  };

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayCard reading={reading} key={index} />
    ));
  };

  todayFunction = () => {
    const newDateReading = this.state.dailyData[0];
    return <TodayCard reading={newDateReading} />;
  };

  render() {
    const { isLoading, dataLoading } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Simple Weather App</Text>
        <div>
          {dataLoading ? (
            <h5>Fetching Today's Weather</h5>
          ) : (
            this.todayFunction()
          )}
        </div>
        <h5 className="display-5 text-muted">Kuala Lumpur, MY</h5>
        <div className="row justify-content-center">
          {isLoading ? <h5>Fetching The Weather</h5> : this.formatDayCards()}
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
