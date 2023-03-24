FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
User story: As a user, I should be able to “click on an event”, so that I can see view the details of the event


Scenario 1: An event element is collapsed by default.
Given the list of events have been loaded
When the user has not clicked on any events
Then all events should be collapsed, only showing generic info

Scenario 2: User can expand an event to see its details.
Given the list of events have been loaded
When the user clicks on “show details” for an event
Then the event element should expand, showing more specific details about the event

Scenario 3: User can collapse an event to hide its details.
Given the user has already clicked on an event to show its details
When the user clicks “close” on the event to collapse
Then the event should collapse and hide the additional details, showing events with only generic info
