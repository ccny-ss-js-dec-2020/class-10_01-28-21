module.exports = function(inquirer, databaseConnection) {
  console.log("Updating a Sesame Street Character")
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
          message: "What is the character that you are looking to update?",
          choices: sesameStreetCharacterNames,
          name: "character_choice"
        },
        {
          type: "list",
          message: "What column would you like to update?",
          choices: ["name", "species", "performed by", "description"],
          name: "field_to_update"
        },
        {
          type: "input",
          message: "What is the new value of the column that you're updating?",
          name: "new_value"
        }
      ]).then(function(answers){
        try {
          const updateQuery = "UPDATE sesame_street_characters SET "+answers.field_to_update+"='"+answers.new_value+"' WHERE name='"+answers.character_choice+"'"
          databaseConnection.query(updateQuery, function(err, data){
            if(err){
              throw new Error(err)
            }
            if(data.message.includes("Changed: 1")){
              console.log("Update Successful");
            } else {
              console.log("No Record Updated");
            }
          })
        } catch (e) {
          console.log("ERROR!");
          console.log(e);
        } finally {
          /* Whether or not there's an error, do this */
          databaseConnection.end();
        }
      });
    } catch (e) {
      console.log(e)
    }
  });

}
