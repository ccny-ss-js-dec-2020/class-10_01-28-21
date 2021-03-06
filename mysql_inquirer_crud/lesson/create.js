const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

console.log("Inserting into the 'students' table")
inquirer.prompt([
  {
    type: "input",
    message: "What is the value for the 'name' column?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the value for the 'age' column?",
    name: "age"
  }
]).then(function(answers){
  const name = answers.name;
  const age = answers.age;
  /*
    The reason for the single quotes around the double quotes is because sql expects quotes around a string/varchar
  */
  const insertQuery = "INSERT INTO students (name, age) VALUES ('"+name+"','"+age+"')";
  databaseConnection.query(insertQuery, function(err, data){
    /*
      try {} catch (e){} .... is a better way of error handling
     You throw the error in the try {} section
     Then you catch that error in the catch(e){} section, with the error being in the "e" param
     The finally section is usually used to close out a process, which we are doing with the database connection here
    */
    // test the error by inputting a varchar for the age
    try {
      if(err){
        throw new Error(err)
      }
      console.log("Insert Successful")
    } catch (e){
      // if there's an error thrown, this is where it will end up
      console.log("ERROR!")
      console.log(e)
    } finally {
      // whether there's an error or not, do this
      // usually you just end a connection here
      databaseConnection.end();
    }
  })
});
