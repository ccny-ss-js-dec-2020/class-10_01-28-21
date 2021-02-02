module.exports = function(inquirer, databaseConnection){
  inquirer.prompt([
    {
      type: "input",
      message: "What is the character's name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is the character's species? (If none, just leave blank)",
      name: "species"
    },
    {
      type: "input",
      message: "Who is the character performed by?",
      name: "performedBy"
    },
    {
      type: "input",
      message: "What is a description of the character",
      name: "description"
    }
  ]).then(function(answers){
    let characterName;
    if(answers.name == ""){
      characterName = null;
    } else {
      characterName = "'" + answers.name + "'";
    }

    const characterSpecies = "'" + answers.species + "'";

    let performedBy;
    if(answers.performedBy == ""){
      performedBy = null
    } else {
      performedBy = "'" + answers.performedBy + "'";
    }

    let characterDescription;
    if(answers.description == ""){
      characterDescription = null;
    } else {
      characterDescription = "'" + answers.description + "'";
    }
    let createCharacterQueryString = 'INSERT INTO sesame_street_characters (name, species, performedBy, description)';
    createCharacterQueryString += ' VALUES (';
    createCharacterQueryString += ""+characterName+",";
    createCharacterQueryString += ""+characterSpecies+",";
    createCharacterQueryString += ""+performedBy+",";
    createCharacterQueryString += ""+characterDescription+"";
    createCharacterQueryString += ')';

      databaseConnection.query(createCharacterQueryString, function(err, res){
        try {
          if(err){
            throw new Error(err)
          }
          console.log(res)
          console.log("Character Inserted")
        } catch (e){
          const errorString = e.toString();
          if(errorString.includes("cannot be null")){
            if(errorString.includes("name")){
              console.log("Can not insert no value for name");
            } else if (errorString.includes("performedBy")){
              console.log("Can not insert no value of performed by")
            } else {
              console.log("Can not insert no value for description");
            }
          }
        } finally {
          databaseConnection.end();
        }
      });

  });
}
