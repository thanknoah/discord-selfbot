// Imports
const { Client, Message, MessageEmbed } = require('discord.js-selfbot-v13');
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
let specialFont = false;
let cancelTimer = false;
let jokeTimes = 0;
const votes = [];

//Font
const alphabet = [...'abcdefghijklmnopqrstuvwxyz '];
const newAlphabet = [...'​​🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉 '];

chalk.level = 1;

// On Ready && Procedure
client.on("ready", () => {
    console.log(chalk.yellowBright("☝🐨  𝐍ᵒ𝒶𝓗 𝐬𝔢ᒪ𝔣 вｏt Ⓥ２  ♘🐨"));
    console.log(chalk.yellowBright("☝🐨  𝐍ᵒ𝒶𝓗 𝐬𝔢ᒪ𝔣 вｏt Ⓥ２  ♘🐨\n"));

    console.log(chalk.greenBright(`Welcome back, ${client.user.username}`));
    console.log(chalk.redBright("New updates: time function added, jokes are set to desensitized automatically, bug/UI clean up.\n"));

    console.log(chalk.green(`Logged in: ${client.user.username}`));
    console.log(chalk.green(`User ID: ${client.user.id}\n`))

    if (prefix == "" || prefix == null) {
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
    let string = msg.content.split(" ");
    let command = string[0].substring(1, string[0].length);
    let arg1 = string[1];
    let arg2 = string[2];
    let groupedArgs = "";

    string.forEach((v, i) => {
        if (i != 0) groupedArgs = groupedArgs + ` ${v}` ;
    })

    if (!msg.content.startsWith(prefix) && specialFont == true && !msg.content.startsWith("`")) { 
          // Font check
         if (specialFont == true) {
              if (msg.author.id == userId) {
                  let newMessage = ""
            
                  for (char = 0; char < msg.content.length; char++) {
                       for (var x = 0; x < alphabet.length; x++) {
                           if (alphabet[x] == msg.content[char] || alphabet[x].toUpperCase() == msg.content[char]) {
                               newMessage += newAlphabet[x+2]
                           }
                        }
                   }

                 msg.edit(newMessage)
              }
        }
        return false; 
    }
    
    if (command == "hello") {
        msg.reply("`" + "Hello " + `${msg.author.username}` + ", how are you on this fine day?`");
        console.log(chalk.green("LOGGED COMMAND: Stated Greeting!"));
    }

    if (command == "font" && msg.author.id == userId) {
        if (arg1 == "on" || arg1 == "On") {
            specialFont = true
        } else {
            specialFont = false;
        }
    }

    if (command == "help") {
        msg.reply("`help, hello, setAboutMe [args], setActivity [args], joke, setThemeColor [args], create_vote [args], vote [args] [args2], dad_finder [args], nerd [args], time, cancelTime, low-self-esteem, who`");
    }

    if (command == "setAboutMe" && msg.author.id == userId) {
        client.user.setAboutMe(groupedArgs)
        if (response == "Yes" || response == "yes") msg.reply("`" + "`Set about me too: `" + `${groupedArgs}` + "`");
        if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed about me!"));
        
    }

    if (command == "setActivity" && msg.author.id == userId) {
        client.user.setActivity(groupedArgs)

        if (response == "Yes" || response == "yes") msg.reply("`" + `Set activity too: ${groupedArgs}` + "`");
        if (logCommands == "Yes" || response == "yes") return console.log(chalk.green("LOGGED COMMAND: Changed activity!"));
        
    } 
    if (command == "translate" && msg.author.id == userId) {
        axios
        .post(`https://libretranslate.com/?source=en&target=tr&q=Hello`)
        .then((response) => {
            console.log(response);
        })
    }


    if (jokeTimes > 30) setTimeout(() => { jokeTimes = 0}, 10000);

    if (command == "joke") {
        if (jokeTimes > 30) {
            msg.reply("`" + `Can you calm the fuck down ${msg.author.username}, I aint gonna say anymore jokes! Thats final` + "`")
        } else {
            axios
            .get("https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious&format=json")
            .then((response) => {
                msg.reply("`" +  response.data.setup + "`");
                setTimeout(() => { msg.reply("`" + response.data.delivery + "`"); }, 3000);
                console.log(chalk.green("LOGGED COMMAND: Stated Joke!"))
             });

             jokeTimes += 1
        }
    }

    if (command == "setThemeColor" && msg.author.id == userId) {
        if (arg1 == "random") {
            let num = Math.floor(Math.random() * 3);

            if (num == 1) {
                client.user.setAccentColor("BLUE");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Blue. Please wait a couple of seconds for this change too take place.");
            }
            if (num == 2) {
                client.user.setAccentColor("RED");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Red. Please wait a couple of seconds for this change too take place.");
            }
            if (num == 3) {
                client.user.setAccentColor("GREEN");
                if (response == "Yes" || response == "yes") msg.reply("Set Color too Green. Please wait a couple of seconds for this change too take place.");
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
        msg.reply("`never ever ever ever give up " + `${msg.author.username}` + "`");
    }

    if (command == "who") {
        msg.reply("`Asked? Bro lets be real, shut up.`")
    }

    if (command == "dad_finder") {
        if (groupedArgs == msg.author.username) {
            msg.reply("`" + `${groupedArgs}'s dad has esecaped, and will come back in years. Congrats!!!!!!!!!!` + "`");
        } else {
            let num = Math.round(Math.random() * 100);

            if (num < 20) {
                msg.reply("`" + `Tough luck, ${arg1}, your dads gonna come back in ${num} years. Sorry.` + "`");
            }
            if (num > 50 && num < 75) {
                msg.reply("`" + `Oh no, ${arg1}, your dads gonna come back in ${num} years. Hang in tight, you may not see- nvm.` + "`");
            }
            if (num > 75) {
                msg.reply("`" + `Sorry to inform you, ${arg1}, but you might not see your dad again. *cough* in ${num} years` + "`");
            }
        }
    }

    if (command == "nerd") {
        let num = Math.round(Math.random() * 100);

        if (num < 20) {
            msg.reply("`" + `${arg1} is ${num}% smart. Your such a fucking retard, go study you -1111 IQ person. (dnt worry your uh smrt)` + "`");
        }
        if (num > 50 && num < 75) {
             msg.reply("`" + `${arg1} is ${num}% smart. I mean you study, and your decently smart, but you dont miss some social events. Your kind of a nerd!` + "`");
         }
        if (num > 75) {
            msg.reply("`" + `${arg1} is ${num}% smart, go get a life you nerd, I despise you with all my might. Just kidding, your calm!` + "`");
        }
    }

    if (command == "time" && msg.author.id == userId) {
          let x = setInterval(() => {
            function addZero(i) {
                if (i < 10) {i = "0" + i}
                return i;
              }
              
              const d = new Date();
              let h = addZero(d.getUTCHours());
              let m = addZero(d.getUTCMinutes());
              let s = addZero(d.getUTCSeconds());
              let time = h + ":" + m + ":" + s;
              
              msg.edit("`" + "The time in the UK is " + `${time}` + "`");

              if (cancelTimer == true) {
                 cancelTimer = false;
                 msg.delete();
                 clearInterval(x);
              }
          }, 1000);
    }

    if (command == "cancelTime"  && msg.author.id == userId) {
        cancelTimer = true;
    }

    if (command == "generateHash" && msg.author.id == userId) {
        msg.reply("`Generating hash...`");
        msg.reply("`Your generated hash, DO NOT REVEAL THIS TO ANYONE: " + Math.sin(Math.random(1,100)) + "`")
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

        if (existingUser) {
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
