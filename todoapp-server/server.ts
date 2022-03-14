import express from 'express';

const app = express();
const port = 3000;
// Sample JWT token for demo purposes
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' +
  'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}.`)
})

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