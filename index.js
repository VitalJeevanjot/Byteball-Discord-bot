const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const byteball = require('byteball'); // live or main net
//const c_bb = new byteball.Client();
const c_bb = new byteball.Client('wss://byteball.org/bb-test', true); // test net with proper encoding for test net `true`
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const client = new Discord.Client();
const config = require("./config.json");
const ls = require('localStorage');
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.byteball = c_bb;
client.ls = ls;
MongoClient.connect(url, {
  useNewUrlParser: true
}, function(err, db) {
  if (err) throw err;

  client.dbo = db.db("BotDB");
  client.dbo.createCollection("ByteballUsers_Name", function(err, res) {
    if (err) throw err;
    client.dbo.createIndex("ByteballUsers_Use", "user_id", {
      unique: true
    }, (er, res) => {
      if (er) throw er;
    });
    client.dbo.createIndex("ByteballUsers_Use", "byte_address", {
      unique: true
    }, (er, res) => {
      if (er) throw er;
    });
  });

  client.dbo.createCollection("ByteballUsers_Use", function(err, res) {
    if (err) throw err;
  });

  client.dbo.createCollection("ByteballUsers_records", function(err, res) {
    //Manages based on type= payment, vote [sender byteball address, receiver byteball address] , [ poll creator byteball address, boter byteball address]
    if (err) throw err;
  });

});


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
