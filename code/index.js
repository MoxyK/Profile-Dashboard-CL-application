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
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer name?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "engineerId",
                message: "What is your engineer ID?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer email?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer Github?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            console.log(engineer);
            createTeam()
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern name?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "internId",
                message: "What is your intern ID?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "internEmail",
                message: "What is your intern email?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
             {
                type: "input",
                name: "internSchool",
                message: "What is your intern School?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
             },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            idList.push(answers.internId);
            console.log(intern);
            createTeam()
        })
    }

    function createTeam() {
        inquirer.prompt([
            {
               type: "list",
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
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
            },

            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's Id?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                },
            },

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            idList.push(answers.managerId);
            console.log(manager);
            createTeam();
        })
    }

    createManager();
}


appMenu();