import React, { Component } from "react";
import moment from "moment";

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
      <div className="event hvr-bob">
        <h2 className="summary">{event.summary}</h2>
        <p className="event-start">
          {`${moment(event.start.dateTime).format("LLLL")}`}
        </p>
        <p className="event-location">
          {`@${event.summary} | ${event.location}`}
        </p>

        {collapsed ? (
          <button
            className="details-button hvr-glow mt-4"
            onClick={this.toggleState}
            style={{ display: "block", margin: "0 auto" }}
          >
            Details
          </button>
        ) : (
          <button
            className="hide-details-button hvr-glow mt-4"
            onClick={this.toggleState}
            style={{ display: "block", margin: "0 auto" }}
          >
            Hide Details
          </button>
        )}
        {!collapsed && (
          <div className="event__Details mt-4">
            <h3 className="about">About event:</h3>
            <p className="description">{event.description}</p>
            <a className="link" href={event.htmlLink} target="blank">
              See details on Google Calendar
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
