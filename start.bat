@echo off
start cmd.exe /k "npm i -g nodemon" & "npm i" & "npm start"
cd server
start cmd.exe /k "nodemon index"
exit
