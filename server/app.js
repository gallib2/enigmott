require('dotenv').config();
const express = require('express');
// const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const paint = require('./paint');
const userRouter = require('./user/userRouter');
const riddleRoute = require('./riddles/riddleRoute');
const Redis = require('ioredis');
const connectRedis = require('connect-redis')
const session = require('express-session');
const REDIS_OPTIONS = require('./config/cache');
const {SESSION_OPTIONS} = require('./config/session');
 
const RedisStore = connectRedis(session);

const client = new Redis(REDIS_OPTIONS);

const app = express();

 
app.use(
  session({ 
    ...SESSION_OPTIONS,
    store: new RedisStore({ client }),
  })
)

console.log('session from app.js: ', session);


const port = process.env.PORT || 4000;

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

var whitelist = ["https://enigmot.herokuapp.com", "https://enigmot-api.herokuapp.com", /\.herokuapp\.com$/, "http://localhost:3000"]
var corsOptions = {
  credentials: true,
  origin: whitelist,
  // allowedHeaders: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin",  "Origin", "X-Requested-With", "Content-Type", "Accept"]
}


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

// app.use(allowCrossDomain);


app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use('/paint', paint);
app.use('/user', userRouter);
app.use('/riddles', riddleRoute);

// app.use(function (req, res, next) {
//   console.log('from middlewhere')
//   res.status(404).send('Not Found')
// })

app.use(function (err, req, res, next) {
  console.error('err: ', err.stack);

  if(err.message) {
    return res.status(err.status).json({message: err.message});
  }

  return res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});