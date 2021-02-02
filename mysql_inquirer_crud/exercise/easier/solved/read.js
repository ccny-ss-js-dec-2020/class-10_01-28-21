module.exports = function(inquirer, databaseConnection){
  const selectQuery = "SELECT * FROM sesame_street_characters";
  databaseConnection.query(selectQuery, function(err, data){
    try {
      if(err){
        throw new Error(err)
      }
      const sesameStreetCharacterNames = data.map((character) => character.name);
      inquirer.prompt([
          {
            type: "list",
            message: "Pick a Character",
            choices: sesameStreetCharacterNames,
            name: "character_choice"
          }
        ]).then(function(answers){
          data.forEach((character) => {
            if(character.name === answers.character_choice){
              console.log("Name: " + character.name);
              if(character.species){
                console.log("Species: " + character.species);
              } else {
                console.log("Species: None");
              }
              console.log("Performed By: " + character.performedBy);
              console.log("Description: " + character.description);
            }
          })
        });
    } catch (e) {
      console.log(e)
    } finally {
      databaseConnection.end();
    }
  });
}
