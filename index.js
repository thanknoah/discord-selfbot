// Imports
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const fs = require('fs');

// Main Event
client.on("ready", () => {
    console.log(`Logged in: ${client.user.username}`);
});

// Login
client.login(fs.readFileSync("token.txt", "utf-8", (err) => {
    if (err) {
        return console.log(err);
    }
}));