const Discord = require('discord.js');
const tokens = [
    "Token-1",
    "Token-2",
    "Token-3",
    "Token-4"
];
const chnls = [
    "Ses ıd-1",
    "Ses ıd-2",
    "Ses ıd-3",
    "Ses ıd-4",
];
const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "Erdem Welcome Bots",
            type: "LISTENING"
        });
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("ıd").rawPosition)) { //Yetkili Id'si
                ses = await concon.play('./yetkili.mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get("ıd").rawPosition) {//Hosgeldin ıd'si
                ses = await concon.play('./hosgeldin.mp3');
                selamlı.push(cur.member.user.id);
            }
        }
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}
