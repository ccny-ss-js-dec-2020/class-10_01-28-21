const mysql = require('mysql');
const inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();
/*
  I'm going to create a table and insert records for this lesson
  because it is not easy to delete records when they have a foreign key to another table

  CREATE TABLE the_office_characters (
    name VARCHAR(255)
  );

  INSERT INTO the_office_characters (name) VALUES ('Michael');
  INSERT INTO the_office_characters (name) VALUES ('Dwight');
  INSERT INTO the_office_characters (name) VALUES ('Pam');
  INSERT INTO the_office_characters (name) VALUES ('Angela');
  INSERT INTO the_office_characters (name) VALUES ('Jim');
  INSERT INTO the_office_characters (name) VALUES ('Kevin');
  INSERT INTO the_office_characters (name) VALUES ('Rick');
*/

const selectQuery = "SELECT * FROM the_office_characters";
let deleteQuery = "DELETE FROM the_office_characters WHERE name=";

databaseConnection.query(selectQuery, function(err, data){
  try {
    if(err){
      throw new Error(err);
    }
    const theOfficeCharacters = data.map((office_character) => office_character.name);
    inquirer.prompt([
      {
        type: "list",
        message: "What character would you like to delete from the 'the_office_characters' table?",
        choices: theOfficeCharacters,
        name: "office_character_to_delete"
      }
    ]).then(function(answers){
      deleteQuery += "'"+answers.office_character_to_delete+"'";
      try {
        databaseConnection.query(deleteQuery, function(deleteErr, deleteData){
          if(deleteErr){
            throw new Error(deleteErr);
          }
          console.log(deleteData)
          console.log("Deletion Successful");
        });
      } catch (e) {
        console.log("ERROR!");
        console.log(e);
      } finally {
        databaseConnection.end();
      }

    });
  } catch (e) {
    console.log("ERROR!");
    console.log(e);
  }
});
