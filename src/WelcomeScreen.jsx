import React from "react";
import "./WelcomeScreen.css";

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <img src="./logo-192.png" alt="you-herd-logo" />
      <h1>Welcome to You Herd?</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack
        developers.
      </h4>
      <h4>Follow the Herd!</h4>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              props.getAccessToken();
            }}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with google</b>
          </button>
        </div>
      </div>
      <a
        href="https://jpark42.github.io/meet/privacy.html"
        rel="nofollow noopener"
        className="privacy-link"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}

export default WelcomeScreen;
