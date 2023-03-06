const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = []
const teamMembers = []


const appMenu = () => {

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer name?"
             },
             {
                type: "input",
                name: "engineerId",
                message: "What is your engineer ID?"
             },
             {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer email?"
             },
             {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer Github?"
             },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            createTeam()
        })
    }

    function addIntern() {

    }

    function completeTeam() {

    }

    function createTeam() {
        inquirer.prompt([
            {
               type: "List",
               name: "memberChoice", 
               message: "Which team members would you like to add?",
               choices: [
                    "Engineer",
                    "Intern",
                    "No more members needed"
               ]
            }
        ]).then(userChoice => {
            if(userChoice.memberChoice === "Engineer") {
                // Engineer add
                addEngineer();
            } else if(userChoice.memberChoice === "Intern") {
                // Intern add
                addIntern();
            } else {
                // Complete team
                completeTeam();
            }
        })
    }

    function createManager(){
        console.log("Begin buidling your team.");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager's name?",
            },

            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's Id?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?"
            },

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    createManager();
}


appMenu();