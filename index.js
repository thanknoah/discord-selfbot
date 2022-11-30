// Imports
const { Client, MessageFlags, ModalSubmitFieldsResolver } = require('discord.js-selfbot-v13');
const chalk = require("chalk");
const client = new Client({
    checkUpdate: false
});
const prompt = require('prompt-sync')();
const axios = require('axios');
const fs = require('fs');

// Config Variables
let prefix = JSON.parse(fs.readFileSync("info.json", "utf-8", (err) => { console.log(chalk.red(err)) })).prefix;
let response = JSON.parse(fs.readFileSync("info.json", "utf-8", (err) => { console.log(chalk.red(err)) })).response;
let logCommands = JSON.parse(fs.readFileSync("info.json", "utf-8", (err) => { console.log(chalk.red(err)) })).logCommand;
let activityDefault = JSON.parse(fs.readFileSync("info.json", "utf-8", (err) => { console.log(chalk.red(err)) })).defaultActivity;
let activityTypeDefault = JSON.parse(fs.readFileSync("info.json", "utf-8", (err) => { console.log(chalk.red(err)) })).activityType;
let userId = null;
const votes = [];

chalk.level = 1;

// On Ready && Procedure
client.on("ready", () => {
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));
    console.log(chalk.redBright("🐨☯  ŇＯ𝓪ħş ѕ𝔢ᒪƑβⓞ𝕋 𝐯Ѳ.０❶  ♪♜"));

    console.log(chalk.green(`Logged in: ${client.user.username}`));
    console.log(chalk.green(`User ID: ${client.user.id}`))

    if (prefix == null) {
        console.log(chalk.green("It seems like your new. Please config your settings!"))

        const setPrefix = prompt(chalk.redBright("Prefix > "));
        const setActivity = prompt(chalk.redBright("[Skip if not set] Set activity > "));
        const setActivityType = prompt(chalk.redBright("Activity Type > "));
        const setRespondToCommand = prompt(chalk.redBright("Bot responds [Yes, No] > "));
        const setCommandLog = prompt(chalk.redBright("Log commands [Yes, No] > "));

        response = setRespondToCommand;
        logCommands = setCommandLog;
        prefix = setPrefix;

        try {
            (setActivity) ? client.user.setActivity(setActivity, { activity: setActivityType }) : "";
        } catch (err) {
            console.log(chalk.red(`Error: ${err}`));
        }

        let data = {
            "prefix": prefix,
            "defaultActivity": setActivity,
            "activityType": setActivityType,
            "response": response,
            "logCommand": logCommands
        }

        fs.writeFileSync("info.json", JSON.stringify(data), (err) => {
            console.log(chalk.red(`Error: ${err}`))
        })
    } else {

        try {
            (activityDefault) ? client.user.setActivity(activityDefault, { activity: activityTypeDefault }) : "";
            console.log("Note: if you want to change any settings go to info.json. Do not mess around with the {, or quotation marks as it will break the code.")
        } catch (err) {
            console.log(chalk.red(`Error: ${err}`));
        }
    }

    console.log(" ")

    userId = client.user.id;
});

// On Message
client.on("message", (msg) => {
    if (!msg.content.startsWith(prefix)) return false;

    let string = msg.content.split(" ");
    let command = string[0].substring(1, string[0].length);
    let arg1 = string[1];
    let arg2 = string[2];
    let groupedArgs = "";

    string.forEach((v, i) => {
        if (i != 0) groupedArgs = groupedArgs + ` ${v}` ;
    })

    if (command == "hello") {
        msg.reply("Hello!");
        console.log(chalk.green("LOGGED COMMAND: Stated Greeting!"));
    }

    if (command == "help") {
        msg.reply("Available Commands: `help, hello, setAboutMe [args], setActivity [args], joke, setThemeColor [args], create_vote [args], view_vote [args], vote [args] [args2], low-self-esteem`");
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
        .get("https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=json")
        .then((response) => {
            msg.reply(response.data.setup);
            setTimeout(() => { msg.reply(response.data.delivery); msg.reply("Haha! So funny."); }, 3000);
            console.log(chalk.green("LOGGED COMMAND: Stated Joke!"))
        });
    }

    if (command == "setThemeColor") {
        if (arg1 == "random") {
            let num = Math.floor(Math.random() * 3);

            if (num == 1) {
                client.user.setAccentColor("BLUE");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Blue");
            }
            if (num == 2) {
                client.user.setAccentColor("RED");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Red");
            }
            if (num == 3) {
                client.user.setAccentColor("GREEN");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Green");
            }

            if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed color!"));
        }

        if (arg1) {
            try {
               client.user.setAccentColor(arg1.toLocaleUpperCase())
               if (response == "Yes" || response == "yes") msg.reply(`Changed Color too: ${arg1}. Please wait a couple of seconds for this change too take place.`);
               if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed color!"));
            } catch (e) {
               console.log(chalk.red("ERROR: Not valid theme color!"))
               if (response == "Yes" || response == "yes") msg.reply(`Not valid theme color: ${arg1}`);
            }
        }
    }

    if (command == "low-self-esteem") {
        msg.reply("Your the best man!");
    }

    if (command == "create_vote" && msg.author.id == userId) {
        let existing = false;

        votes.forEach((vote) => {
            if (vote.name == arg1) {
                existing = true;
            }
        })

        if (existing) {
            if (response == "Yes" || response == "yes") msg.reply("Vote already exists!");
        }
        if (!existing) {
            votes.push({ name: arg1, voters: [], vote: [] });
            if (response == "Yes" || response == "yes") msg.reply(`Created vote: ${arg1}. To vote, please say ${prefix}vote ${arg1} yes/no `);
            if (logCommands == "Yes" || response == "yes") return console.log(chalk.green(`LOGGED COMMAND: Added vote: ${arg1}`));
        }
    }

    if (command == "vote") {
       let existing = false;
       let existingUser = false;
       let i = 0;

       votes.forEach((vote, index) => {
           if (vote.name == arg1) {
               existing = true;
               i = index;

               votes[i].voters.forEach((user) => {
                  if (user == msg.author.username) {
                      existingUser = true;
                      return '';
                  }
               })
           }
        });

        if (existing) {
            if (votes[i].voters.length == 0) {
                votes[i].voters.push(msg.author.username);
                votes[i].vote.push(arg2);

                if (response == "Yes" || response == "yes") msg.reply("Your vote has been added. There are currently " + votes[i].voters.length + " votes.");
                if (logCommands == "Yes" || response == "yes") return console.log(chalk.green(`LOGGED COMMAND: ${msg.author.username} has voted ${arg2} for ${votes[i].name}`));
            }

            if (existingUser == false) {
                votes[i].voters.push(msg.author.username);
                votes[i].vote.push(arg2);

                if (response == "Yes" || response == "yes") msg.reply("Your vote has been added. There are currently " + votes[i].voters.length + " votes.");
                if (logCommands == "Yes" || response == "yes") return console.log(chalk.green(`LOGGED COMMAND: ${msg.author.username} has voted ${arg2} for ${votes[i].name}`));
             }
        }

        if (!existing) {
            if (response == "Yes" || response == "yes") msg.reply("Vote does not exist!");
        }

        if (!existingUser) {
            if (response == "Yes" || response == "yes") msg.reply("You have already voted for this");
        }
    };

    if (command == "view_vote") {
        votes.forEach((vote, i) => {
            if (vote.name == arg1) {
               string = "";
               vote.voters.forEach((voterName, person) => {
                    string = string + `${voterName}: ${votes[i].vote[person]}\n`;
               });

               msg.reply("Votes: " + "`" + string + "`") ;
            }
        });
    }
});

// Login
client.login(fs.readFileSync("token.txt", "utf-8", (err) => {
    if (err) {
        return console.log(chalk.red(err) + "\n PLEASE PUT YOUR TOKEN IN TOKEN.TXT AND RUN AGAIN");
    }
}));
