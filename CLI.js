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
        name: "contactName",
        message: "Enter Contact Name (like user name) : ",
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter Contact Name (like user name)"
            } else {
                // let regex = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/
                // if (!regex.exec(answers)) {
                //     return "Please Enter a valid fullName"
                // }
                return true
            }
        }
    },
    {
        type: "Input",
        name: "fullName",
        message: "Enter a Full Name : ",
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter Contact fullName"
            } else {
                // let regex = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/
                // if (!regex.exec(answers)) {
                //     return "Please Enter a valid fullName"
                // }
                return true
            }
        }
    },
    {
        type: "Input",
        name: "Number",
        message: "Enter Contact Phone Number : ",
        validate: (answers) => {
            if (answers.length < 1) {
                return "Please Enter a Number"
            } else {
                let regx = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/
                if(!regx.exec(answers))
                    return `Plaese Enter a Valid Morrocain phone number start with ${chalk.underline.black.bgWhite("+212")}`
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
                return "Please Enter a Gender"
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

// advanced methods

/**
 * create new contact
 */
program
    .command("addContact")
    .description("Add new contact")
    .action(() => {

        inquirer.prompt(questions)
            .then(answers => {
                // console.log(answers);
                
                let contact = new Contact({
                    contactName: answers.contactName,
                    fullName: answers.fullName,
                    number: answers.Number,
                    gender: answers.Gender
                })

                inquirer.prompt([{
                    type: "confirm",
                    name: "Confirmation",
                    default: true,
                    message: "You wand to save this Contact?"
                }])
                .then(() => {
                    contact.save((errs, res) => {
                        if (errs) {
                            console.error(chalk.red(`Cannot save! for this reason: \n -${chalk.underline(errs.errmsg)}`));
                            return;
                        }
                        console.log(chalk.italic.green("Contact saved Successfully!"));
                        
                    })
                }).catch( err => {
                    console.log(err);
                    
                })
                
            })
            .catch(err => {
                console.error(err);
                
            });
        
    })

    /**
     * Find contact by his unique name contactName
     */
program
    .command('find')
    .description('Find a contact')
    .action(() => {
        inquirer.prompt([{
            type: "Input",
            name: "contactName",
            message: "Enter the ConatctName you want to search for : "
        }])
        .then(answ => {
            Contact.findOne({ contactName: answ.contactName }, (err, res) => {
                if (err) {
                    console.error(chalk.red(`${chalk.underline(err)}`));
                    return;
                }
                
                if (res.length < 1) {
                    console.error(chalk.red(`${chalk.bgRed.white.underline(`No contact found!`)}`));
                    return;
                }
                console.log(res);
                
            })
        })
    })

program.parse(process.argv);

// if (program.force == undefined) {
    
// }
