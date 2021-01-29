const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

const selectQuery = "SELECT * FROM students";

console.log("Reading from the 'students' table")
inquirer.prompt([
  {
    type: "list",
    message: "Select One",
    choices: ["Get All Students", "Look Up a Student"],
    name: "student_choice"
  }
]).then(function(answers){
  if(answers.student_choice === "Get All Students"){
    try {
      databaseConnection.query(selectQuery, function(err, data){
        if(err){
          throw new Error(err)
        }
        console.log("Read Successful");
        console.log(data)
      })
    } catch(e){
      console.log("ERROR!");
      console.log(e);
    } finally {
      databaseConnection.end();
    }
  } else {
    inquirer.prompt([
      {
        type: "input",
        message: "What student are you looking for information on?",
        name: "student_name"
      }
    ]).then(function(answers){
      /*
         I'm "selecting all" instead of a "select all from where"
         so we can use javascript to to check the input student name
         against the object that we receive from the database
      */
      const inputStudent = answers.student_name.toLowerCase();
      let studentExists = false;
      try {
        databaseConnection.query(selectQuery, function(err, data){
          if(err){
            throw new Error(err)
          }
          data.forEach((student) => {
            if(student.name.toLowerCase() === inputStudent){
              console.log(student);
              studentExists = true;
            }
          })
          if(!studentExists){
            console.log("Student Does Not Exist")
          }
        })
      } catch(e){
        console.log("ERROR!");
        console.log(e);
      } finally {
        databaseConnection.end();
      }
    });
  }

});

const selectQueryResults = async function(query){
  return new Promise(function(resolve, reject) {
    databaseConnection.query(query, function(err, data){
        if(err){
          return reject(err)
        }
        console.log("Read Successful")
        return resolve(data)
    });
  });
  /*
    To call this function, use:
    selectQueryResults(selectQuery).then(function(result){
      console.log(result)
    });
  */
}
