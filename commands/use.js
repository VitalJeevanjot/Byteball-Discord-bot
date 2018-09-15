// Use command to use byteball wallet by adding it's address and wif to mongodb
// On ready save this data in different collection and then update here for the firest time for each user and use different collection for name attestation
exports.run = (client, message, args) => {
  if (args.length == 2) {
    let query = {
      discord_id: message.author.id
    }
    let attr = {
      $set: {
        byte_address: args[0],
        wif: args[1]
      }
    }
    client.dbo.collection("ByteballUsers_Use").updateMany(query, attr, (err, res) => {
      if (err) {
        message.channel.send({
          embed: {
            color: 0xff5000,
            description: "An error occured!"
          }
        }).catch(err => client.guild.send(`${member.user} There is a problem occuring while connecting with you. Turn your communication with guild members on.`));;
      } else {
        message.channel.send({
          embed: {
            color: 0xffe100,
            description: "Data updated successfully with given values. Make sure to give right `Byteball address` and `wif`."
          }
        }).catch(err => client.guild.send(`${member.user} There is a problem occuring while connecting with you. Turn your communication with guild members on.`));;
      }
    });

  } else {
    checkCommandFormat();
  }

  function checkCommandFormat() {
    message.channel.send({
      embed: {
        color: 0xff5000,
        description: "Please checkout command format with `!help` command"
      }
    }).catch(err => client.guild.send(`${member.user} There is a problem occuring while connecting with you. Turn your communication with guild members on.`));;
  }
}