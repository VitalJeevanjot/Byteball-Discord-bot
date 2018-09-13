const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const byteball = require('byteball');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.byteball = byteball;

MongoClient.connect(url,{useNewUrlParser:  true
}, function(err, db){
  if(err) throw err;
  client.dbo = db.db("BotDB");
  client.dbo.createCollection("ByteballUsers", function(err, res){
    if(err) throw err;
  });
});

client.attr = {
  _id: 1, //Byteball user account id
  wif_acc : "Account WIF",
  name: "new_user",
  discord_id: ["discord id 1", "discord id 2"],
  logged_in : true
}

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
