const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);

const createCharacter = require('./create.js');
const readCharacter = require('./read.js');
const updateCharacter = require('./update.js');
const deleteCharacter = require('./delete.js');

console.log("Welcome to the Sesame Street App")
inquirer.prompt([
  {
    type: "list",
    message: "Pick a CRUD operation to perform",
    choices: ["Create", "Read", "Update", "Delete"],
    name: "crud"
  }
]).then(function(answers){
  const crudAction = answers.crud;
  if(crudAction == "Create"){
    createCharacter(inquirer, databaseConnection);
  } else if (crudAction == "Read"){
    readCharacter(inquirer, databaseConnection);
  } else if (crudAction == "Update"){
    updateCharacter(inquirer, databaseConnection);
  } else {
    deleteCharacter(inquirer, databaseConnection);
  }
});
