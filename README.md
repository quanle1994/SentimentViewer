# Sentiment Viewer

### Installation
1. Obtain your Google Map Javascript API key at <link>https://developer.google.com</link> and insert it in static/index.html file, line 123
1. Link: https://nodejs.org/en/
1. Download version 8.11.4 LTS 
1. Open command prompt and navigate to the Project Folder (SentimentViewer)
1. Run <code>npm install</code>
1. Once done, run <code>npm start</code>
1. Open browser and enter <link>http://localhost:3000</link>

### Functionality Demonstration
This project comes with 2 different view designs:

###Phone View
![Alt text](phoneView.gif?raw=true "PhoneView")

###Desktop View
![Alt text](desktopView.gif?raw=true "DesktopView")

### Functionality Description:
- The map view will desplay the markers according to the JSON data in sentimentdata.json file
- When clicking on the marker, a pop up will appear showing all the social messages associated with that marker
- The social messages come from 2 sources, Instagram and Twitter. Hence, they will be denoted with the source's icon on the left of the message
- Each message will contain the user name of the poster, the date, the message content, and the sentiment string at the bottom. The
top right corner will be marked with the sentiment label, namely 'Positive', 'Neutral' or 'Negative'
- When clicking on the chart icon, the chart view will open up, displaying a pie chart and a line chart
    + The pie chart shows the aggregates of positive, neutral and negative messages in total.
    + The line chart shows the count of the messages recorded in each day.
    + Color coding: Green = Positive, Yelllow = Neutral, Orange = Negative
- To go back to the map, click on the back button or the map icon at the top right corner

### Technical Information:
- Stack: NodeJS - HTML with D3.js for data visualisation
- External Libraries
    + Axios for AJAX communication
    + Jquery
    + Bootstrap
    + Google Maps API
    + Font Awesome
    + Julmot Mark to format #HashTags