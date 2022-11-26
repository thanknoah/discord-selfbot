// Imports
const { Client, Message } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false
});
const prompt = require('prompt-sync')();
const fs = require('fs');

// Config Variables
let prefix = "";

// On Ready && Procedure
client.on("ready", () => {
    console.log(`Logged in: ${client.user.username}`);

    const setPrefix = prompt("Prefix > ");
    const setActivity = prompt("[Skip if not set] Set activity >");
    const setActivityType = prompt("Activity Type > ")

    try {
        (setActivity) ? client.user.setActivity(setActivity, { activity: setActivityType }) : "";
    } catch (err) {
        console.log(`Error: ${err}`)
    }

    prefix = setPrefix;
});

// On Message
client.on("message", (msg) => {
    if (!msg.content.startsWith(prefix)) return false;
    if (msg.content.includes("hello")) {
        msg.reply("Hello!");
    }

    if (msg.content.includes("help")) {
        msg.reply("`Available Commands: !hello, !help`")
    }
})

// Login
client.login(fs.readFileSync("token.txt", "utf-8", (err) => {
    if (err) {
        return console.log(err);
    }
}));
