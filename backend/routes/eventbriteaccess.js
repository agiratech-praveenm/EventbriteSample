const axios = require('axios');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Define your API key, client secret, and redirect URI
const API_KEY = 'O5KFH4EK4Y7AO6CH6B';
const CLIENT_SECRET = 'KK44MXXM2YJRFIP7AM3WNX5LYPY4DUETKCLQD3VH7UTAMGEHV4';

router.get('/authorize', (req, res) => {
    // console.log("req.headers.authorization",req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]
    //decode the jwt token to get the username
    const decodedToken =    jwt.verify(token, 'askdjfsd223423sdfsd334');
    const username = decodedToken.username;
    const REDIRECT_URI = `http://localhost:8080/api/eventbriteaccess/${username}/store_access_token`;
    const authorizationUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}`;
    // Redirect the user to the Eventbrite authorization URL
    res.json({ authorizationUrl });
});

router.get('/:user/store_access_token/', async (req, res) => {
    const code = req.query.code;
    const username = req.params.user;
    const REDIRECT_URI = `http://localhost:8080/api/eventbriteaccess/${username}/store_access_token`
    console.log(code);
    const tokenURL = 'https://www.eventbrite.com/oauth/token';
    try {
        // Set the content type header to 'application/x-www-form-urlencoded'
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const data = new URLSearchParams();
        data.append('grant_type', 'authorization_code');
        data.append('client_id', API_KEY);
        data.append('client_secret', CLIENT_SECRET);
        data.append('code', code);
        data.append('redirect_uri', REDIRECT_URI);

        const response = await axios.post(tokenURL, data, { headers });
        const accessToken = response.data.access_token;



        // Find the user in the database and update the access token
        const user = await User.findOneAndUpdate(
            { username },
            { accessToken: accessToken },
            { new: true }
        );

        res.json({ message: 'Eventbrite access token stored successfully' });
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        res.status(500).send('Error exchanging authorization code for access token');
    }
});

module.exports = router;