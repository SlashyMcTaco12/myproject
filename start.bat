@echo off
start cmd.exe /k "npm i -g nodemon && npm i && npm start"
start cmd.exe /k "cd server && nodemon index"
exit
