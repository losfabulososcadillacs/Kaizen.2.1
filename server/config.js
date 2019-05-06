// require the necessary libraries and routes
const express = require("express");
const bodyParser = require("body-parser");
const compression = require('compression');
const tasksRoutes = require('./routes/tasksRoutes');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Cors = require('cors')

const passport = require('passport');
const passportJWT = require('passport-jwt');
// create a new express instance
const app = express();
//middleware
// initialize passport with express
app.use(passport.initialize());
app.use(Cors())
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/../client/dist"));
app.use(tasksRoutes);

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({
    id: jwt_payload.id
  });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
const sequelize = new Sequelize({
  database: 'TaskBoard',
  username: 'root',
  password: 'Holacode',
  dialect: 'mysql',
});
//check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// create user model
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// create table with user model
User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

// create some helper functions to work on the database
const createUser = async ({
  name,
  password
}) => {
  return await User.create({
    name,
    password
  });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};

// set some basic routes
app.get('/', function (req, res) {
  res.json({
    message: 'Express is up!'
  });
});

// get all users
app.get('/users', function (req, res) {
  getAllUsers().then(user => res.json(user));
});

// register route
app.post('/register', function (req, res, next) {
  const {
    name,
    password
  } = req.body;
  createUser({
    name,
    password
  }).then(user =>
    res.json({
      user,
      msg: 'account created successfully'
    })
  );
});

//login route
app.post('/login', async function (req, res, next) {
  const {
    name,
    password
  } = req.body;
  if (name && password) {
    let user = await getUser({
      name: name
    });
    if (!user) {
      res.status(401).json({
        message: 'No such user found'
      });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = {
        id: user.id
      };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({
        msg: 'ok',
        token: token
      });
    } else {
      res.status(401).json({
        msg: 'Password is incorrect'
      });
    }
  }
});

// protected route
app.get('/protected', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  res.json('Success! You can now see this without a token.');
});

// set port to listen, is going to be set eihter by the process or is going to be 3000
const port = (process.env.PORT || 3003);
// listening on 3000
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});