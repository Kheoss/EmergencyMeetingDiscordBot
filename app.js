const dotenv = require('dotenv');
dotenv.config();

const emergencyMeetingImageULR = `https://cdn.vox-cdn.com/thumbor/9clzBGYVUwMfQgix1Yf6VI9i__E=/0x0:1920x1080/1400x933/filters:focal(807x387:1113x693):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/67390942/Emergency_Meeting.0.jpg`;

const spamDelay = 1000;
const Discord = require('discord.js');
const client = new Discord.Client();

let canCreateMeeting = true;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//#region Help

const writeHelpInstructions = (msg)=>{
    msg.reply(`\nList of Awesome Commands (some are sus):
      !emergency : use it carefully, you summon an emergency meeting 
      !help: tell you AGAIN what can I do (should add a resit for this)`);
}

//#endregion

//#region Emergency_Meeting
const startEmergencyMeeting = (msg)=>{
    if(!canCreateMeeting){
        msg.reply("An emergency meeting already running, U sus ¯\\_(ツ)_/¯");
        return;
    }
    spam(msg);
}
const spam = async (msg)=>{
    canCreateMeeting = false;
    let index = 0;

    while(index < 7){
        index++;
        msg.channel.send("@everyone");
        const embededPhoto = new Discord.MessageEmbed()
        .setTitle(`Emergency Meeting! Everyone is expected in Emergency Meeting Channel!`)
        .setImage(emergencyMeetingImageULR);
        msg.channel.send(embededPhoto);
        await new Promise((resolve)=>setTimeout(resolve,spamDelay));
    }
    canCreateMeeting = true;
}
//#endregion


client.on('message', msg => {
    let {content} = msg;
  if (content.startsWith("!")) {
        content = content.slice(1,content.length);
        switch(content){
            case 'emergency' : startEmergencyMeeting(msg);break;
            case 'help': writeHelpInstructions(msg);break;
            default: msg.reply(`Bruh, maybe you need to see !help`) ;break;
        }
  }
});

client.login(process.env.BOT_TOKEN);