const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const axios = require('axios');

const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'askdjfsd223423sdfsd334');
        const username = decodedToken.username;

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }

        const accessToken = user.accessToken;

        const orgUrl = 'https://www.eventbriteapi.com/v3/users/me/organizations/';
        const orgResponse = await axios.get(orgUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const organizationId = orgResponse.data.organizations[0].id;

        //make a request to eventbrite api to fetch the events created by the user
        const eventUrl = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events`;
        const eventsResponse = await axios.get(eventUrl, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const events = eventsResponse.data.events;
        res.json(events);
        }catch(error){
            console.error('Error fetching events:', error);
            res.status(500).json({message: 'Error fetching events'});
        }
});

module.exports = router;