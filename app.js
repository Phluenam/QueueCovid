let http = require('http');
let fs = require('fs');

var express = require('express');
var app = express();
var path = require('path')
const fetch = require('node-fetch');

app.use(express.static('public')); 

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get('/WaitTimes', function(req,res){
  console.log("hey we got a request");
  //console.log(req);
  //res.send('HIII');
  getHAData().then(function(data){res.send(data)});
});

// Define the URLS we will be scraping
const haURL = "https://www.ha.org.hk/aedwt/aedwt.html?Lang=ENG"

const port = 3000;
const host = 'localhost';

// Define the method for collecting the data
let getHAData = async () => {
  data = await fetch('https://www.ha.org.hk/aedwt/data/aedWtData.json')
    .then(response => response.json())
    .then(data => data.result.hospData);
  
  var districtLists = {'HK':[],'KLN':[],'NT':[]};
  data.forEach(entry => {
    //console.log(entry);
    district = entry.seq.split('-')[0]
    districtLists[district].push({'code':entry.hospCode,'EN':entry.hospNameEn,'WaitTime':entry.topWait});
  });
  console.log(districtLists);
  return districtLists;
};

app.listen(port);