import React, { Component } from 'react';

export default Event;


class Event extends Component {
  state = { collapsed: true };

  toggleState = () => {
    this.state.collapsed
      ? this.setState({
          collapsed: false,
        })
      : this.setState({
          collapsed: true,
        });
  };
  
render() {
  const { event } = this.props;
  const { collapsed } = this.state;
  return (
      <div className="event">
            <h2 className="summary">{event.summary}</h2>
                <p className="event-start">
                    {new Date(event.start.dateTime).toString()}
                </p>
                <p className="event-location">
                    {`@${event.summary} | ${event.location}`}
                </p>
                
            {collapsed ? (
                <button className="details-button" onClick={this.toggleState}>
                    Details
                </button>
            ): (
                <button className="hide-details-button" onClick={this.toggleState}>
                    Hide Details
                </button>
            )}
            {!collapsed && (
                <div className="event__Details">
                    <h3 className="about">About event:</h3>
                    <p className="description">{event.description}</p>
                    <a 
                        className="link" 
                        href={event.htmlLink}
                        target="blank"
                        >
                        See details on Google Calendar
                    </a>
                    
                </div>
            )}
      </div>
  )};
};

