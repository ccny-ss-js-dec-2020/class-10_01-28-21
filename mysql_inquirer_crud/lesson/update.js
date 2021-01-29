const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

console.log("Updating the 'students' table")
inquirer.prompt([
  {
    type: "input",
    message: "What is the student's first name that you are looking to update?",
    name: "student_name"
  },
  {
    type: "list",
    message: "What column would you like to update from the 'students' table?",
    choices: ["name", "age"],
    name: "field_to_update"
  },
  {
    type: "input",
    message: "What is the new value of the column that you're updating?",
    name: "new_value"
  }
]).then(function(answers){
  try {
    const updateQuery = "UPDATE students SET "+answers.field_to_update+"='"+answers.new_value+"' WHERE name='"+answers.student_name+"'"
    databaseConnection.query(updateQuery, function(err, data){
      if(err){
        throw new Error(err)
      }
      console.log("Update Successful");
      console.log(data);
    })
  } catch (e) {
    console.log("ERROR!");
    console.log(e);
  } finally {
    databaseConnection.end();
  }
});
