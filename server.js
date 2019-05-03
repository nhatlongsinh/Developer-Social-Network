const debug = require('debug')('server:app');
const express = require('express');
const passport = require('passport');
const path = require('path');
const db = require('./common/db');

const usersRoute = require('./routes/api/usersRoute');
const profileRoute = require('./routes/api/profileRoute');
const postsRoute = require('./routes/api/postsRoutes');

const app = express();
// db
db();

const port = process.env.PORT || 5000;

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport
app.use(passport.initialize());
require('./common/passport')(passport);

// routes
app.use('/api/users', usersRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}
app.listen(port, () => {
  debug(`Server started on ${port}`);
});
