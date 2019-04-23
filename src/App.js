import React, { Component } from "react";
import "./style/App.css";
class App extends Component {
    state = {
        data: {},
        date: "",
        time: "",
        color: {
            dark: "#492011",
            ligth: "#F4EEEC",
            middle: "#F1D4C9",
            darkmiddle: "#805252"
        },
        day: true
    };

    componentDidMount = () => {
        this.api();
    };

    api = () => {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=47.8356042&lon=35.1219634&appid=90cf1c84525707fec9654a6207cf4d56`
        )
            .then(res => {
                return res.json();
            })
            .then(json => {
                this.setState({ data: json });
            });
    };

    setTime = () => {
        var newDate = new Date();
        // 47.8356042
        // Longitude: 35.1219634
        console.log(newDate.getHours() + ":" + newDate.getMinutes());
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var seconds = newDate.getSeconds();
        if (hours <= 9 && hours >= 1) hours = "0" + hours;
        else if (hours === 0) this.api();
        if (minutes <= 9) minutes = "0" + minutes;
        if (seconds <= 9) seconds = "0" + seconds;
        var time = hours + ":" + minutes + ":" + seconds;
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        if (month <= 9) month = "0" + month;
        if (day <= 9) day = "0" + day;
        var date = day + "." + month + "." + newDate.getFullYear();
        this.setState({
            time,
            date,
            day: hours < 18 && hours > 8 ? true : false
        });
    };

    componentWillMount = () => {
        setInterval(() => this.setTime(), 1000);
        setInterval(() => this.api(), 300000);
    };

    render() {
        console.log(this.state.data);
        return (
            <div className="App">
                <button onClick={() => this.setState({ day: !this.state.day })}>
                    Change color
                </button>
                <div
                    className="weather"
                    style={
                        this.state.day
                            ? { backgroundColor: this.state.color.ligth }
                            : { backgroundColor: this.state.color.dark }
                    }
                >
                    <div className="weather-wiget-wrapper">
                        <div className="up">
                            <div className="block">
                                <div className="text">Wind:</div>
                                <div
                                    className="wind"
                                    style={
                                        this.state.day
                                            ? {
                                                  color: this.state.color.dark,
                                                  backgroundColor: this.state
                                                      .color.middle
                                              }
                                            : {
                                                  color: this.state.color.ligth,
                                                  backgroundColor: this.state
                                                      .color.darkmiddle
                                              }
                                    }
                                >
                                    {this.state.data.wind
                                        ? this.state.data.wind.speed + " m/s"
                                        : "Loading..."}
                                </div>
                            </div>
                            <div  className="block">
                                <div className="text">Max temperature: </div>
                                <div
                                    className="wind"
                                    style={
                                        this.state.day
                                            ? {
                                                  color: this.state.color.dark,
                                                  backgroundColor: this.state
                                                      .color.middle
                                              }
                                            : {
                                                  color: this.state.color.ligth,
                                                  backgroundColor: this.state
                                                      .color.darkmiddle
                                              }
                                    }
                                >
                                    {this.state.data.main
                                        ? this.state.data.main.temp_max -
                                          273.15 +
                                          "°C"
                                        : "Loading..."}
                                </div>
                            </div>
                            <div className="block">
                                <div className="text">Min temperature :</div>
                                <div
                                    className="wind"
                                    style={
                                        this.state.day
                                            ? {
                                                  color: this.state.color.dark,
                                                  backgroundColor: this.state
                                                      .color.middle
                                              }
                                            : {
                                                  color: this.state.color.ligth,
                                                  backgroundColor: this.state
                                                      .color.darkmiddle
                                              }
                                    }
                                >
                                    {this.state.data.main
                                        ? this.state.data.main.temp_min -
                                          273.15 +
                                          "°C"
                                        : "Loading..."}
                                </div>
                            </div>
                        </div>
                        <div className="down">
                            <div className="temp-city">
                                <div
                                    className="temp"
                                    style={
                                        this.state.day
                                            ? {
                                                  color: this.state.color.dark,
                                                  backgroundColor: this.state
                                                      .color.middle
                                              }
                                            : {
                                                  color: this.state.color.ligth,
                                                  backgroundColor: this.state
                                                      .color.darkmiddle
                                              }
                                    }
                                >
                                    {this.state.data.main
                                        ? this.state.data.main.temp -
                                          273.15 +
                                          "°C"
                                        : "Loading..."}
                                    <div className="text">
                                        {this.state.data.weather
                                            ? this.state.data.weather[0]
                                                  .description
                                            : "Loading..."}
                                    </div>
                                </div>
                                <div
                                    className="city"
                                    style={
                                        this.state.day
                                            ? { color: this.state.color.dark }
                                            : { color: this.state.color.ligth }
                                    }
                                >
                                    {this.state.data.name
                                        ? this.state.data.name
                                        : "Loading..."}
                                </div>
                            </div>

                            <div className="time-date">
                                <div
                                    className="time"
                                    style={
                                        this.state.day
                                            ? { color: this.state.color.dark }
                                            : { color: this.state.color.ligth }
                                    }
                                >
                                    {this.state.time}
                                </div>
                                <div
                                    className="date"
                                    style={
                                        this.state.day
                                            ? { color: this.state.color.dark }
                                            : { color: this.state.color.ligth }
                                    }
                                >
                                    {this.state.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
