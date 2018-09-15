module.exports = (client) => {
  console.log("I am ready to take over!");
  let guild = client.channels.find( channel => channel.name === "gb");
  let b_emoji = client.emojis.find(emoji => emoji.name === 'byteball'); // Emoji stores with id and can be found with name.
  client.emoji = b_emoji;
  client.guild = guild;
  guild.send(`I Am Ready ${b_emoji} !`);
}
