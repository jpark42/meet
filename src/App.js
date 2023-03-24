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
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 30
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      //update the state only if this.mounted = true
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
      }
    });
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
    const { eventCount, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        //check if locationsEvents value is "all", otherwise filter the event list
        const locationEvents = (location === 'all') ? 
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount);
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
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} /> 
        <EventList events={this.state.events} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
      </div>
    );
  }
}

export default App;
