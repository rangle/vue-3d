const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 8081;

app.get('/', (req, res) => {
  res.send("We have to auth twitter through this proxy server because twitter doesn't support CORS");
});

var headerValue = "";


app.post('/auth/twitter', async (req, res) => {
  const resp = await fetch("https://api.twitter.com/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic NXUzcE9XR1AySHNPWmRkZWtHUFp1bkE5RDpUa2UySkxIQWI1c1FMZFJmUWxqSWttNVdJczJOQW5LVjhoUUN3SGJ1cG1xNExIV2lnQg==",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: "grant_type=client_credentials"
  });
  let body = await resp.json();
  res.setHeader('Access-Control-Allow-Origin', "*");
  headerValue = `Bearer ${body.access_token}`;
  res.send({ authHeaderValue: `Bearer ${body.access_token}`})
  return res.end();
});

app.get('/getStuff', async (req, res) => {
  const resp = await fetch("https://api.twitter.com/1.1/search/tweets.json?q=nasa&count=1", {
    method: "GET",
    headers: {
      "Authorization": headerValue,
      "Access-Control-Allow-Origin": "*"
    }
  });
  const nasaTweets = await resp.json();
  console.log(nasaTweets);
  res.send(nasaTweets);
  res.end();
});

app.listen(PORT, () => console.log(`Server is up at HOST:${PORT}`));



