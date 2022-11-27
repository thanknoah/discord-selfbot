// Imports
const { Client } = require('discord.js-selfbot-v13');
const chalk = require("chalk");
const client = new Client({
    checkUpdate: false
});
const prompt = require('prompt-sync')();
const axios = require('axios');
const fs = require('fs');

// Config Variables
let prefix = "";
let response = "Yes";
let logCommands = "Yes";
let userId = null;
chalk.level = 1;

// On Ready && Procedure
client.on("ready", () => {
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));

    console.log(chalk.green(`Logged in: ${client.user.username}`));
    console.log(chalk.green(`User ID: ${client.user.id}`))

    const setPrefix = prompt(chalk.redBright("Prefix > "));
    const setActivity = prompt(chalk.redBright("[Skip if not set] Set activity > "));
    const setActivityType = prompt(chalk.redBright("Activity Type > "));
    const setRespondToCommand = prompt(chalk.redBright("Bot responds [Yes, No] > "));
    const setCommandLog = prompt(chalk.redBright("Log commands [Yes, No] > "));

    console.log(" ")

    response = setRespondToCommand;
    logCommands = setCommandLog;

    try {
        (setActivity) ? client.user.setActivity(setActivity, { activity: setActivityType }) : "";
    } catch (err) {
        console.log(chalk.red(`Error: ${err}`));
    }

    userId = client.user.id;
    prefix = setPrefix;
});

// On Message
client.on("message", (msg) => {
    if (!msg.content.startsWith(prefix)) return false;

    let string = msg.content.split(" ");
    let command = string[0].substring(1, string[0].length);
    let arg1 = string[1];
    let groupedArgs = ""

    string.forEach((v, i) => {
        if (i != 0) groupedArgs = groupedArgs + ` ${v}` 
    })

    if (command == "hello") {
        msg.reply("Hello!");
    }

    if (command == "help") {
        msg.reply("Available Commands: `help, hello, setAboutMe, setActivity, joke`");
    }

    if (command == "setAboutMe" && msg.author.id == userId) {
        client.user.setAboutMe(groupedArgs)
        if (response == "Yes" || response == "yes") msg.reply(`Set about me too: ${groupedArgs}`);
        if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed about me!"));
    }

    if (command == "setActivity" && msg.author.id == userId) {
        client.user.setActivity(groupedArgs)
        if (response == "Yes" || response == "yes") msg.reply(`Set activity too: ${groupedArgs}`);
        if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed activity!"));
    }

    if (command == "joke") {
        axios
        .get("https://v2.jokeapi.dev/joke/Programming,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt")
        .then((response) => {
            msg.reply(response.data);
            console.log(chalk.green("Successfully told joke!"))
        })
    }
})

// Login
client.login(fs.readFileSync("token.txt", "utf-8", (err) => {
    if (err) {
        return console.log(chalk.red(err));
    }
}));
