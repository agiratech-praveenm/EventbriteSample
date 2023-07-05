const axios = require('axios');
const express = require('express');
const app = express();

// Define your API key, client secret, and redirect URI
const API_KEY = 'O5KFH4EK4Y7AO6CH6B';
const CLIENT_SECRET = 'KK44MXXM2YJRFIP7AM3WNX5LYPY4DUETKCLQD3VH7UTAMGEHV4';
const REDIRECT_URI = 'http://localhost:3000/oauth/redirect';
const username='Luffy';

app.get('/',(req,res)=>{
    res.send('WELCOME TO EVENTBRITE EVENTS FETCHER we fill fetch ur events from eventbrite account');
});

// Create a route to handle the redirect
app.get('/authorize', (req, res) => {
  const authorizationUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&username=${username}`;
  console.log(authorizationUrl);
  // Redirect the user to the Eventbrite authorization URL
  res.redirect(authorizationUrl);
});

app.get('/oauth/redirect', (req, res) => {
  const code = req.query.code;
  console.log(code);
  const tokenURL = 'https://www.eventbrite.com/oauth/token';

  // Set the content type header to 'application/x-www-form-urlencoded'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('client_id', API_KEY);
  data.append('client_secret', CLIENT_SECRET);
  data.append('code', code);
  data.append('redirect_uri', REDIRECT_URI);

  axios
    .post(tokenURL, data, { headers })
    .then(response => {
      const accessToken = response.data.access_token;

      // Make an authenticated API request to Eventbrite to get the organization ID
      const organizationURL = 'https://www.eventbriteapi.com/v3/users/me/organizations/';
      const orgHeaders = {
        'Authorization': `Bearer ${accessToken}`
      };

      axios
        .get(organizationURL, { headers: orgHeaders })
        .then(orgResponse => {
          const organizationId = orgResponse.data.organizations[0].id;

          // Make an authenticated API request to Eventbrite to get event details under the organization
          const eventsURL = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`;
          axios
            .get(eventsURL, { headers: orgHeaders })
            .then(eventsResponse => {
              const events = eventsResponse.data.events;
              res.send('Authorization successful! Events: ' + JSON.stringify(events));
            })
            .catch(error => {
              console.error('Error retrieving events:', error);
              res.status(500).send('Error retrieving events');
            });
        })
        .catch(error => {
          console.error('Error retrieving organization ID:', error);
          res.status(500).send('Error retrieving organization ID');
        });
    })
    .catch(error => {
      console.error('Error exchanging authorization code for access token:', error);
      res.status(500).send('Error exchanging authorization code for access token');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
