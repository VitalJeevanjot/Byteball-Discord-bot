module.exports = (client, member) => {
  member.user.send(`Welcome ${member.user}. Use !help command to get list of bot commands.`).catch(err => client.guild.send(`${member.user} There is a problem occuring while connection with you. Turn your communicating with guild members on.`));
  //User name attestation...
  let mini = 500;
  let maxi = 500 + mini;

  function randi() {
    return Math.floor(Math.random() * (maxi - mini + 1) + mini);
  }

  let attr = { //Byteball user account id
    byte_address: "Addr_" + randi().toString(), // unique
    user_id: "NewUser_" + randi().toString(), // unique
    _id: member.user.id, // Simple
    logged_in: true,
  }

  client.dbo.collection("ByteballUsers_Name").insertOne(attr, (err, res) => {
    if (err) {
      client.guild.send(`${member.user} there is a problem while adding your random name and byteball address inside databse. Please use !sign command to manually sign with username, use !help to know more.`).catch(err => client.guild.send(`${member.user} There is a problem occuring while connecting with you. Turn your communication with guild members on.`));
    }
  });
  // !use command databse
  let attr2 = { //Byteball user account id
    //Make discord_id primary key user won't keep leaving and adding byteball server and makingdata bigger
    byteaddress: "Addr_" + randi().toString(), //Adding any value won't matter at all
    wif: "NewUser_" + randi().toString(), // Can add any value
    _id: member.user.id, // Simple
    logged_in: true
  }
  client.dbo.collection("ByteballUsers_Use").insertOne(attr2, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      member.user.send(`Your new account has been added to databse ${client.emoji}`).catch(err => client.guild.send(`${member.user} There is a problem occuring while connection with you. Turn your communicating with guild members on.`));
    }
  });

}
