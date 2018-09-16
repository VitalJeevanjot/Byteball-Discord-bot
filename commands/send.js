exports.run = (client, message, args) => { /* To send bytes either simply or with conversion...*/

  let wif_db = "Anything"; // If sender wif and account is not added then handle here...

  if (args.length == 2) { // Address of receiver and how many bytes here.
    client.dbo.collection("ByteballUsers_Use").find({
      _id: message.author.id
    }).toArray(function(err, res) {
      try {
        if (res[0].wif.startsWith("NewUser_")) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Add valid wif in databse first, to use 2 parameter command. Use !help command to know more`
            }
          });
          return;
        }
      } catch (err) {
        message.channel.send({
          embed: {
            color: 0xff0000,
            description: `Your account is not added, Leave and Rejoin the server.`
          }
        });
        return;
      }
      //console.log("Send bytes running!");
      wif_db = res[0].wif;
      sendBytes();
    });

    function sendBytes() {
      //console.log("Send bytes running!");
      let params = {
        outputs: [{
          address: args[0],
          amount: parseInt(args[1])
        }]
      };

      //  console.log(args[0] + " - " + args[1]);
      client.byteball.post.payment(params, wif_db, (err, res) => {
        if (err) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Error occured:- ${err}`
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 0x03e500,
              description: "Transaction successful `" + res + "`"
            }
          });
        }
      });
    }
  } else if (args.length == 3) { // after -u flag 1st argument should be username instead of byteball address(unique attested with byteball address) and how many bytes
    if (args.indexOf("-u") >= -1) { //FOrmat :- !send -u <User_id> <amount>
      client.dbo.collection("ByteballUsers_Name").find({
        user_id: args[1]
      }).toArray(function(err, res) {
        if (err) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Error occured:- ${err}`
            }
          });
        } else {
          let params = [];
          try {
            paramsu = {
              outputs: [{
                address: res[0].byte_address,
                amount: parseInt(args[2])
              }]
            };
          } catch (err) {
            message.channel.send({
              embed: {
                color: 0xff0000,
                description: `Didn't found username in my database.`
              }
            });
            return;
          }
          let t_wif = "xyz";
          client.dbo.collection("ByteballUsers_Use").find({
            _id: message.author.id
          }).toArray(function(err, res) {
            try {
              if (res[0].wif.startsWith("NewUser_")) {
                message.channel.send({
                  embed: {
                    color: 0xff0000,
                    description: `Add a valid wif in databse first, to use username send/receive facility.`
                  }
                });
              } else {
                t_wif = res[0].wif;
                transferUserBytes();
              }
            } catch (err) {
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  description: `Your account is not added, Leave and Rejoin the server.`
                }
              });
              return;
            }
          });

          function transferUserBytes() {
            client.byteball.post.payment(paramsu, t_wif, (err, res) => {
              if (err) {
                message.channel.send({
                  embed: {
                    color: 0xff0000,
                    description: `Error occured:- ${err}`
                  }
                });
              } else {
                message.channel.send({
                  embed: {
                    color: 0x03e500,
                    description: "Transaction successful `" + res + "`"
                  }
                });
              }
            });
          }
        }
      });

    } else { //If -u flag not given then 3rd arg should be a wif
      wif_db = args[2];
      client.byteball.post.payment(params, wif_db, (err, res) => {
        if (err) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Error occured ${err}`
            }
          });
        } else {
          message.channel.send({
            embed: {
              color: 0x03e500,
              description: "Transaction successful `" + res + "`"
            }
          });
        }
      });
    }
  } else if (args.length == 4) { // asset transfer with asset unit id and -a flag
    if (args.indexOf("-a") >= -1) {
      client.dbo.collection("ByteballUsers_Use").find({
        _id: message.author.id
      }).toArray(function(err, res) {
        if (res[0].wif.startsWith("NewUser_")) {
          message.channel.send({
            embed: {
              color: 0xff0000,
              description: `Add valid wif in databse first, to send assets. Use !help command to know more.`
            }
          });
          return;
        } else {
          wif_db = res[0].wif;
          sendBytesWithAsset();

          function sendBytesWithAsset() {

            let params = { // args [0] should contains -a flag !send <flag> <address_receiver> <amount> <asset_unitId>
              asset: args[3],
              outputs: [{
                address: args[1],
                amount: parseInt(args[2])
              }]
            };
            client.byteball.post.payment(params, wif_db, (err, res) => {
              if (err) {
                message.channel.send({
                  embed: {
                    color: 0xff0000,
                    description: `Error occured:- ${err}`
                  }
                });
              } else {
                message.channel.send({
                  embed: {
                    color: 0x03e500,
                    description: "Transaction successful `" + res + "`"
                  }
                });
              }
            });
          }
        }
      });
    } else {
      commandFormatErr();
    }
  } else { // If args length is 4 then custom assets will be transferred.
    commandFormatErr();
  }

  function commandFormatErr() {
    message.channel.send({
      embed: {
        color: 0xff5000,
        description: "Please checkout command format with `!help` command"
      }
    });
  }
}
