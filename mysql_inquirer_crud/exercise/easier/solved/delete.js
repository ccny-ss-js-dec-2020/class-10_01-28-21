module.exports = function(inquirer, databaseConnection) {
  console.log("Deleting a Sesame Street Character")
  const selectQuery = "SELECT * FROM sesame_street_characters";
  databaseConnection.query(selectQuery, function(err, characters){
    try {
      if(err){
        throw new Error(err)
      }
      const sesameStreetCharacterNames = characters.map((character) => character.name);
      inquirer.prompt([
        {
          type: "list",
          message: "What is the character that you are looking to delete?",
          choices: sesameStreetCharacterNames,
          name: "character_choice"
        }
      ]).then(function(answers){
        try {
          const deleteQuery = "DELETE FROM sesame_street_characters WHERE name='"+answers.character_choice+"'";
          databaseConnection.query(deleteQuery, function(err, data){
            if(err){
              throw new Error(err)
            }
            console.log("Deletion Successful");
            /*
              If you really want to do a check if the record still exists
              do a read after the deletion within the deletion callback function
            */
          })
        } catch (e) {
          console.log("ERROR!");
          console.log(e);
        } finally {
          databaseConnection.end();
        }
      });
    } catch (e) {
      console.log(e)
    }
  });

}
