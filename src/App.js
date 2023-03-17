import React, {Component} from 'react';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {
  state = {
    events: [],
    locations: []
  }

  //To change the state of events in the App component
  //This new method had to be defined in App because this is where the state is also defined. 
  //Can't directly change a component's state from outside of it in React
  updateEvents = (location) => {
    getEvents().then((events) => {
      //check if locationsEvents value is "all", otherwise filter the event list
      const locationEvents = (location === "all") ? 
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      //update the state only if this.mounted = true
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
  
  componentWillUnmount() { 
    this.mounted = false;
  };


  render() {
    return (
      <div className="App">
        <EventList events={this.state.events} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} /> 
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
