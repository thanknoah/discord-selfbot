@echo off

echo "Make sure you have NodeJS installed."
title Noah's SelfBot V1.2

:START

npm install axios
npm install discord.js-selfbot-v13
npm install prompt-sync
npm install chalk

node index.js

goto START 
