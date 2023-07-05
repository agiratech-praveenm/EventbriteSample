const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');
const eventBriteAccessRoutes = require('./routes/eventbriteaccess');
const jwtverifyroute = require('./routes/JWTverify');
const myevents = require('./routes/myevents');

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signupdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/signin', signinRoutes);
app.use('/api/eventbriteaccess',eventBriteAccessRoutes);
app.use('/api/user',jwtverifyroute);
app.use('/api/myevents',myevents);
// app.use('/api/')

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
