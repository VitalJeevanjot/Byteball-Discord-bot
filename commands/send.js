// To send bytes either simply or with conversion...
exports.run = (client, message, args) => {
  // If sender wif and account is not added then handle here...
  let wif_db = "Anything";
  if (args.length == 2) // Address of receiver and how many bytes
  {
    client.dbo.collection("ByteballUsers_Use").find({
      discord_id: message.author.id
    }).toArray(function(err, res) {
      if (res[0].wif.startsWith("NewUser_")) {
        message.channel.send({
          embed: {
            color: 0xff0000,
            description: `Add valid wif in databse first, to use 2 parameter command. Use !help command to know more`
          }
        });
        return;
      } else {
        wif_db = res[0].wif;
        sendBytes();
      }
    });

    function sendBytes() {
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
  } else if (args.length == 3) // u flag then 1st argument should be username instead of byteball address(unique attested with byteball address) and how many bytes
  {
    if (args.contains("-u")) {
      //Query look for username and then get it's associated byteball adress .
      console.log("Attestation upcoming feature !");
    }
    //If -u flag not given then it migh be a wif
    else {
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

  } else {
    message.channel.send({
      embed: {
        color: 0xff5000,
        description: "Please checkout command format with `!help` command"
      }
    });
  }
}
