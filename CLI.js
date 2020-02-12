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

let questions = [
    {
        type: "Input",
        name: "Name",
        message: "Enter a Name : ",
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter a Name"
            } else {
                return true
            }
        }
    },
    {
        type: "Input",
        name: "Number",
        message: "Enter a Number : ",
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter a Number"
            } else {
                return true
            }
        }
    },
    {
        type: "list",
        name: "Gender",
        message: "Select a Gender : ",
        choices: [
            new inquirer.Separator(`${chalk.yellow("=> Gender <= ")}`),
            {
                name: "male"
            },
            {
                name: "female"
            }
        ],
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter a Name"
            } else {
                return true
            }
        }
    }
]

//  basic method
// program
//     .command("AddContact <name> <number> <gender>")
//     .description("Add new contact")
//     .action((name, number, gender) => {
//         // console.log(`Adding ${name}`);
//         let contact = new Contact({
//             name: name,
//             number: number,
//             gender: gender
//         })
//         contact.save((err, res) => {
//             if (err) {
//                 console.error(chalk.red(`Cannot save! for this reason: \n -${chalk.underline(err)}`));
//                 return;
//             }
//             console.log(chalk.italic.green("Contact saved Successfully!"));
            
//         })
        
//     })

// advanced method
program
    .command("addContact")
    .description("Add new contact")
    .action(() => {

        inquirer.prompt(questions)
            .then(answers => {
                // console.log(answers);
                
                let contact = new Contact({
                    name: answers.Name,
                    number: answers.Number,
                    gender: answers.Gender
                })
                contact.save((err, res) => {
                    if (err) {
                        console.error(chalk.red(`Cannot save! for this reason: \n -${chalk.underline(err)}`));
                        return;
                    }
                    console.log(chalk.italic.green("Contact saved Successfully!"));
                    return;
                })
                
            })
            .catch(err => {
                console.error(err);
                
            });
        
    })


program.parse(process.argv);

// if (program.force == undefined) {
    
// }
