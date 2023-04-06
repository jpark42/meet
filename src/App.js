import React, {Component} from 'react';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  
import Figure from 'react-bootstrap/Figure';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 30,
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;
    //get token from localStorage, where getToken() is called
    const accessToken = localStorage.getItem('access_token');
    //verify token by using checkToken(), a function that was exported from api.js
    //if there is an error in the object returned by checkToken(), then it will return false; otherwise it will return true
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    //if no accessToken or valid token, user can still get access to list of events by getting a new authorization code by logging in
    //this code will eventually be used to get a new accessToken after getEvents() is executed
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        //update the state only if this.mounted = true
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
        }
      });
    };
  }
  
  componentWillUnmount() { 
    this.mounted = false;
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number
    })
  }


  //To change the state of events in the App component
  //This new method had to be defined in App because this is where the state is also defined. 
  //Can't directly change a component's state from outside of it in React
  updateEvents = (location, inputNumber) => {
    const { numberOfEvents, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        //check if locationsEvents value is "all", otherwise filter the event list
        const locationEvents = (location === 'all') ? 
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          numberOfEvents: this.state.numberOfEvents
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
          events : 
          events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputNumber
        });
      })
    }
  }


  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    const offlineMessage = navigator.onLine
      ? ''
      : 'The app has no connection to the internet. The information displayed may not be up-to-date.';

    return (
      <Container className='App mb-5 p-2'>
        <Row className='justify-content-start'>
        <img src="../public/logo-192.png" alt="logo" className="img-fluid"/>
        </Row>
        <Row className='d-flex flex-sm-column flex-row justify-content-md-between mb-4'>
          <Col className='col-12'>
            <WarningAlert text={offlineMessage}/>
          </Col>
          <Col className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
            <CitySearch 
              locations={this.state.locations} 
              updateEvents={this.updateEvents} 
            /> 
          </Col>
          <Col className='col-xs-12 mx-1'>
            <NumberOfEvents 
              numberOfEvents={this.state.numberOfEvents} 
              updateEvents={this.updateEvents}/>
          </Col>
        </Row>

        <EventList events={this.state.events} />
        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { 
            getAccessToken() 
          }} 
        />
      </Container>
    );
  }
}

export default App;
