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

    
    function completeTeam() {
        
    }

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
             }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            createTeam()
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern name?"
             },
             {
                type: "input",
                name: "internId",
                message: "What is your intern ID?"
             },
             {
                type: "input",
                name: "internEmail",
                message: "What is your intern email?"
             },
             {
                type: "input",
                name: "internSchool",
                message: "What is your intern School?"
             }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            idList.push(answers.internId);
            createTeam()
        })
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
        console.log("Begin building your team.");
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