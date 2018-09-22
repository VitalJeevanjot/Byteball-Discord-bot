// Details about command and howto create new account on byteball
exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 0x00ffe5,
      description: `Help Section`,
      fields: [{
          name: "Transfer bytes without saving the WIF In Database:",
          value: "`!send <Receive_Byteball_Address> <Byteball_Amount> <Sender_Wif>`"
        },
        {
          name: "Save WIF (Rerun to Update):",
          value: "`!use <byteball_address> <wif>`"
        },
        {
          name: "Send Bytes Without Entering WIF every time after using `!use` Command:",
          value: "`!send <Receive_Byteball_Address> <Byteball_Amount>`"
        },
        {
          name: "Sign address with username by Paying 1MB Fees (WIF should be saved inside database using `!use` to run this command):",
          value: "`!sign <your_unique_name> <Byteball_ Address_to_sign>`"
        },
        {
          name: "Send bytes with username with -u flag only use after receiver is signed using !sign command:",
          value: "`!send -u <Receiver_Byteball_UserName> <Byteball_Amount>`"
        },
        {
          name: "Create New Assets:",
          value: "https://byteball.market/"
        },
        {
          name: "Send assets with -a Flag:",
          value: "`!send -a <Receiver_Address> <Amount_To_Send> <Asset_id>`"
        },
        {
          name: "Get Account Details:",
          value: "`!info`"
        },
        {
          name: "Get Help [this message]:",
          value: "`!help`"
        }
        ,
        {
          name: "Create new supported Byteball wallet:",
          value: "https://bonuschain.github.io/byteball-paperwallet/"
        }
      ]
    }
  });
}
