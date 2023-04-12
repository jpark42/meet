import { mockData } from "./mock-data";
import axios from "axios";
//Package that creates and displays progress bars at the top of the page
//can show users that app is loading data when trying to access Google Calendar API
import NProgress from "nprogress";

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

/**
 * takes accessToken you found and checks if its a valid token. If not, it redirects you to the Google Authorization screen
 * @param {*} accessToken
 * @type (acessToken: string) => Promise<Object>
 * @returns Object
 */
export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => {
      error.json();
      console.log(error.json);
    });

  return result;
};

//Checks if there is a path, then build the URL with the current path (or build the URL without a path using window.historypushState())
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState("", "", newurl);
  }
};

//get new token if a token doesnt exist or is invalid
//This function takes your code and encodes it using encodeURIComponent, then uses the encoded code to get your token.
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const getTokenLambdaEP =
    "https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/token";
  const { access_token } = await fetch(`${getTokenLambdaEP}/${encodeCode}`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log(error));

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    //if using localhost: return mockData, else: real API data
    NProgress.done();
    return mockData;
  }

  //checks if user is offline or not. If offline, load data of events from cache of last login
  //this line of code is placed here because you don't need to check for token if the user is offline
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const getEventsLambdaEP =
      "https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/get-events";
    const url = `${getEventsLambdaEP}/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      // send events to extractLocations() to get all available locations
      var locations = extractLocations(result.data.events);
      // save results of API call in local storage (events & locations)
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

/**
 * this function will try to get the token from localstorage and validate it
 * if the token is not present, it will redirect to the login page
 * @returns string
 */
export const getAccessToken = async () => {
  // check if token exists in local storage of the user
  let accessToken = localStorage.getItem("access_token");

  // if token is not found or is not valid
  if (!accessToken) {
    // remove any version of the token if it exists
    await localStorage.removeItem("access_token");
    // check for authorization code
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    // if no authorization code is found, user is redirected to Google Auth screen where they can sign in and receive their code
    if (!code) {
      const results = await axios.get(
        "https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    accessToken = await getToken(code);

    //check if an accessToken is found. If no token found, then check for authorization code
    //if no authorization code found, user is automatically redirected to the Google Authorization screen, where they can sign in again and retrieve their code
    const tokenCheck = await checkToken(accessToken);

    if (!tokenCheck) return getAccessToken();
  }

  return accessToken;
};
