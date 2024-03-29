import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null; //set to null as children will override it anyways
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "blue";
    this.width = "230px";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#f2f2f2";
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "orange";
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
