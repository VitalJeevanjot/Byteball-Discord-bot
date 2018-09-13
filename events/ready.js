module.exports = (client) => {
  console.log("I am ready to take over!");
  let guild = client.channels.find( channel => channel.name === "gb");
  guild.send("I am Ready :smile:")

}
