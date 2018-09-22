exports.run = (client, message, args) => { /* To send bytes either simply or with conversion...*/
  if (args.length == 3) { // User_name and Byteball_address only and account wif to verify
    let old_name;
    let old_add;
    client.dbo.collection("ByteballUsers_Name").find({ // 1 byteball account per one discord account
      _id: message.author.id
    }).toArray(function(err, res) {
      try {
        if (res[0].user_id.startsWith("NewUser_")) {
          message.channel.send({
            embed: {
              color: 0xf91191,
              description: `Checking...`
            }
          });
        }
      } catch (err) {
        message.channel.send({
          embed: {
            color: 0xff0000,
            description: `Your account is not in database, Leave and Rejoin the server.`
          }
        });
        return;
      }

      client.dbo.collection("ByteballUsers_Name").find({ // 1 byteball account per one discord account
        _id: message.author.id
      }).toArray(function(err, res) {
        if (res) {
          old_name = res[0].user_id;
          old_add = res[0].byte_address;
        } else {
          return;
        }
      });

      let query = {
        _id: message.author.id
      }
      let attr = {
        $set: {
          user_id: args[0],
          byte_address: args[1]
        }
      }
      client.dbo.collection("ByteballUsers_Name").updateMany(query, attr, (err, res) => { // Format:- !Sign <User_Name> <Byteball_address> <wif>
        if (err) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Username or byteball address is already registered ${err}`
            }
          });
        } else {
          let params = {
            outputs: [{
              address: "QMNGA32JK7F3ZZKX3ICKIJ5ATJ2QRTEA", // It will be my mainnet address. Username attestation hosting server and maintainence fee address.
              amount: 10000000
            }]
          };
          client.byteball.post.payment(params, args[2], (err, res) => {
            if (err) {
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  description: `Error occured ${err}`
                }
              });
              let nattr = {
                $set: {
                  user_id: old_name,
                  byte_address: old_add
                }
              }
              client.dbo.collection("ByteballUsers_Name").updateMany(query, nattr, (err, res) => {});
            } else {
              message.channel.send({
                embed: {
                  color: 0x03e500,
                  description: "Transaction successful `" + res + "`. Your new name has been added and a valid 10 MB fees has been paid."
                }
              });
            }
          });
        }
      });
    });
  }
}



 /*Username attestation with byteball addresses both field unique and discord id without any constraint
Once attested and if discord account lost then user can again attest new name with same byteball address*/
