import { mockData } from './mock-data';
import axios from 'axios';
//Package that creates and displays progress bars at the top of the page
//can show users that app is loading data when trying to access Google Calendar API
import NProgress from 'nprogress';

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


//takes accessToken you found and checks if its a valid token. If not, it redirects you to the Google Authorization screen
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};


//Checks if there is a path, then build the URL with the current path (or build the URL without a path using window.historypushState())
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  };
};

//get new token if a token doesnt exist or is invalid
//This function takes your code and encodes it using encodeURIComponent, then uses the encoded code to get your token.
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/token/' + encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

  
//function doesnt current have any async code yet, but will add ajax request to proper serverless endpoint later
export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) { //if using localhost: return mockData, else: real API data
    NProgress.done();
    return mockData;
};

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/get-events/' + token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  };
};

//
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  //check if an accessToken is found. If no token found, then check for authorization code
  //if no authorization code found, user is automatically redirected to the Google Authorization screen, where they can sign in again and retrieve their code
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://geyqndkg8l.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    };
    return code && getToken(code);
  };
  return accessToken;
    
};

