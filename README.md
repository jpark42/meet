# You Herd?
<h2>Deployed at https://jpark42.github.io/meet/</h2>

<h2>Description</h2>
  <p>You Herd? is a serverless, proof-of-concept progressive web app that lets you search for tech events in your city. A user can expect to see how many events are happening in a particular city and timeframe, and the details of those events.
  The React app utilizes Google Calendar API and OAuth2 authentication to fetch upcoming events.</p>
  
<h2>Key Features</h2>
  <li>Filter events by a city</li>
  <li>Show/hide event details</li>
  <li>Specify numbers of events to be shown on a page</li>
  <li>Use the app even when offline</li>
  <li>Add an app shortcut to the homescreen</li>
  <li>View a chart showing number of upcmoming events in the city</li>

<h2>Techstack and Blueprint</h2>
  <h3>Frontend:</h3>
    <p>Written with JavaScript/React; hosted on GitHub pages.</p>
  <h3>Backend (Server Logic):</h3>
    <p>Written with Node/Express as Lambda functions (FaaS); hosted on AWS (requests come from frontend to Lambda function to data).</p>
  <h3>Backend (Database):</h3>
    <p>Google Calendar API</p>

<h2>User Stories and scenarios</h2>

<h2>FEATURE 1: FILTER EVENTS BY CITY</h2>
  <h3>User story: As a user, I should be able to “filter events by city”, so that I can see the list of events taking place
  in that city</h3>
  <p>
    <ul>Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities</ul>
       <li>Given user hasn’t searched for any city</li>
       <li>When the user opens the app</li>
       <li>Then the user should see a list of all upcoming events</li>
  </p>
  <p>
    <ul>Scenario 2: User should see a list of suggestions when they search for a city</ul>
      <li>Given the main page is open
      <li>When user starts typing in the city textbox
      <li>Then the user should see a list of cities (suggestions) that match what they’ve typed
  </p>
  <p>
    <ul>Scenario 3: User can select a city from the suggested list.</ul>
      <li>Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
      <li>When the user selects a city (e.g., “Berlin, Germany”) from the list
      <li>Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of
      upcoming events in that city
  </p>

<h2>FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS</h2>
  <h3>User story: As a user, I should be able to “click on an event”, so that I can see view the details of the event</h3>
  <p>
    <ul>Scenario 1: An event element is collapsed by default</ul>
      <li>Given the list of events have been loaded</li>
      <li>When the user has not clicked on any events</li>
      <li>Then all events should be collapsed, only showing generic info</li>
  </p>
  <p>
    <ul>Scenario 2: User can expand an event to see its details</ul>
      <li>Given the list of events have been loaded</li>
      <li>When the user clicks on “show details” for an event</li>
      <li>Then the event element should expand, showing more specific details about the event</li>
  </p>
  <p>
    <ul>Scenario 3: User can collapse an event to hide its details</ul>
      <li>Given the user has already clicked on an event to show its details</li>
      <li>When the user clicks “close” on the event to collapse</li>
      <li>Then the event should collapse and hide the additional details, showing events with only generic info</li>
  </p>
  
<h2>FEATURE 3: SPECIFY NUMBER OF EVENTS</h2>
  <h3>User story: As a user, I should be able to “specify the number of events shown”, so that I can view the number
  of events I want to see in the area</h3>
  <p>
    <ul>Scenario 1: When a user hasn’t specified a number, 32 is the default number</ul>
      <li>Given the event details have all been loaded onto the page</li>
      <li>When the user hasn’t specified the number of events</li>
      <li>Then 32 events should be shown on the page as default</li>
  </p>
  <p>
    <ul>Scenario 2: User can change the number of events they want to see</ul>
      <li>Given the event details have all been loaded onto the page</li>
      <li>When the user clicks on a button to adjust the number of events they want to see (15, 30, 45)</li>
      <li>Then the events page should update showing the number of events the user has chosen (15, 30, 45)</li>
  </p>    

<h2>FEATURE 4: USE THE APP WHEN OFFLINE</h2>
  <h3>User story: As a user, I should “be able use to the app offline”, so that I can see the events I viewed the last
  time I was online</h3>
  <p>
    <ul>Scenario 1: Show cached data when there’s no internet connection</ul>
      <li>Given the user previously used the app with internet connection</li>
      <li>When the user goes onto to access the app without internet connection</li>
      <li>Then the user should be able to view events based on cache data from the last time on the app</li>
  </p>
  <p>
    <ul>Scenario 2: Show error when user changes the settings (city, time range)</ul>
      <li>Given the user opened the app offline using cached data</li>
      <li>When the user attempts to make changes to their settings</li>
      <li>Then the user is shown an error that data is not available without internet connection</li>
  </p>
    
<h2>FEATURE 5: DATA VISUALIZATION</h2>
  <h3>User story: As a user, I would like to see a chart of the events occurring in each city, so that I can better
  visualize what events are happening categorized by city</h3>
  <p>
    <ul>Scenario 1: Show a chart with the number of upcoming events in each city</ul>
      <li>Given that the event details have all been loaded in a specified city</li>
      <li>When the user clicks “visualize” button</li>
      <li>Then they will see a chart showing the number of events in that specific city</li>
  </p>
