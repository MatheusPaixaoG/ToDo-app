import express from 'express';
import todoRouter from './src/routes/todo-app.routes';

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// Sample JWT token for demo purposes
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' +
  'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

// Make sure JSON bodies are parsed correctly
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}.`)
})

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use('/', todoRouter);

// Protect other routes
app.use((req, res, next) => {
  if (isAuthorized(req)) {
    console.log('Access granted');
    next();
  } else {
    console.log('Access denied, invalid JWT');
    res.sendStatus(401);
  }
});

// Check whether request is allowed
function isAuthorized(req) {
  let bearer = req.get('Authorization');
  if (bearer === 'Bearer ' + jwtToken) {
    return true;
  }
  return false;
}