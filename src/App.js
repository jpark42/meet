import React, { Component } from "react";
import "./nprogress.css";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { WarningAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: "all",
    numberOfEvents: 30,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    //as soon as app loads, app should get token from localStorage, where getToken() is called
    const accessToken = localStorage.getItem("access_token");

    //verify token by using checkToken(), a function that was exported from api.js
    //if there is an error in the object returned by checkToken(), then it will return false; otherwise it will return true
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;

    //if no accessToken or valid token, user can still get access to list of events by getting a new authorization code by logging in
    //this code will eventually be used to get a new accessToken after getEvents() is executed
    const searchParams = new URLSearchParams(window.location.search);

    //look for authorization code
    const code = searchParams.get("code");

    //Check if you are running site locally or not
    const isLocal = window.location.href.startsWith("http://localhost")
      ? true
      : code || isTokenValid;

    //set state to show welcomeScreen if not runnning locally
    this.setState({ showWelcomeScreen: !isLocal });

    //if running locally, skip welcomeScreen and show list of events
    if (isLocal && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          events = events.slice(0, this.state.numberOfEvents);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  //To change the state of events in the App component
  //This new method had to be defined in App because this is where the state is also defined.
  //Can't directly change a component's state from outside of it in React
  updateEvents = (location, inputNumber) => {
    const { numberOfEvents, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        //check if locationsEvents value is "all", otherwise filter the event list
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          numberOfEvents: this.state.numberOfEvents,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === "all"
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputNumber,
        });
      });
    }
  };

  //Logic for getting data for ScatterChart
  //uses locations and events already saved in state
  //mapping locations and filter the events by each location to get the length of the resulting array
  //using split() function to split the location at the occurrence of a comma followed by a space ", ", which will return an array
  //using shift() array function then to get the first element in the array, which is the name of the city
  //data being returned will be an array with an object of {city, number}
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    const offlineMessage = navigator.onLine
      ? ""
      : "The app has no connection to the internet. The information displayed may not be up-to-date.";

    return (
      <Container className="App mb-5 p-2">
        <Row
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <img src="./logo-192.png" className="logo" alt="you-herd-logo" />
          </div>
        </Row>
        <Row className="slogan">
          <div className="font" style={{ fontWeight: "bold" }}>
            <br />
            <p>Follow the herd! Find tech events near you!</p>
          </div>
        </Row>
        <Row>
          <Col className="col-12">
            <WarningAlert text={offlineMessage} />
          </Col>
        </Row>
        <Row className="d-flex flex-row mb-2">
          <Col xs={12} md={6} className="mt-3">
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
          </Col>
          <Col xs={12} md={6} className="mt-3">
            <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateEvents={this.updateEvents}
            />
          </Col>
        </Row>
        <Row className="data-visualisation-container d-flex flex-column flex-md-row my-4">
          <Col lg={4} className="PieChart text-center">
            <EventGenre events={this.state.events} />
          </Col>
          <Col lg={8} className="ScatterChart text-center">
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 0,
                  bottom: 20,
                  left: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis
                  type="number"
                  dataKey="number"
                  name="Number of Events"
                  allowDecimals={false}
                />

                <Tooltip />
                <Scatter data={this.getData()} fill="#0066ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </Container>
    );
  }
}

export default App;
