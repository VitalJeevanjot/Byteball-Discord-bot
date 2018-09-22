// !info <Unit_ID> to get unit id info pr Just !info to get own byteball account info
exports.run = (client, message, args) => {
  client.dbo.collection("ByteballUsers_Name").find({
    _id: message.author.id
  }).toArray(function(err, res) {
    try {
      message.channel.send({
        embed: {
          color: 0xf4e542,
          description: `Info Section`,
          fields: [{
              name: "Byteball User Name:",
              value: `${res[0].user_id}`
            },
            {
              name: "Byteball Address:",
              value: `${res[0].byte_address}`
            }
          ]
        }
      });
    } catch (err) {
      message.channel.send({
        embed: {
          color: 0xe80022,
          description: "There is problem getting your databse, make sure you save everything with `!sign` command"
        }
      });
    }
  });
}
