require('dotenv').config();
const program = require('commander');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const connect = require('./utlis/database');
const Contact = require('./Models/Contact');
// handel the events
// const EventEmitter = require('events').EventEmitter;

// connect to db
async function connection(){
    await connect();
}
connection();

//initialise the event
// let appState = new EventEmitter();


program
    .option("-f, --force", "Forcing Install")


program.parse(process.argv);
