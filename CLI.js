require('dotenv').config();
const program = require('commander');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const connect = require('./utlis/database');
const Contact = require('./Models/Contact');
// const mongoose = require('mongoose');
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
    .command("AddContact <name> <number> <gender>")
    .description("Add new contact")
    .action((name, number, gender) => {
        // console.log(`Adding ${name}`);
        let contact = new Contact({
            // _id = new mongoose.Types.ObjectId(),
            name: name,
            number: number,
            gender: gender
        })
        contact.save((err, res) => {
            if (err) {
                console.error(chalk.red(`Cannot save! for this reason: \n ${chalk.underline(err)}`));
                return;
            }
            console.log(chalk.italic.green("Contact saved Successfully!"));
            
        })
        
    })


program.parse(process.argv);

// if (program.force == undefined) {
    
// }
