//importing mysql because we'll be interacting with a mysql database
var mysql = require('mysql');
//importing inquirer into our page by using the command 'npm install inquirer --save'
var inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

databaseConnection.query('SELECT * FROM classes_for_animals', function(err, databaseResults){
	if(err){
		throw new Error(err)
	}
	var animalClassNames = databaseResults.map((result) => result.name)

	// calling the inquirer prompt function and setting what we would like to prompt
	inquirer.prompt([
			// inquirer will prompt us with a list to choose from based on the array values that you provide
			// you can only choose one value from a list
			{
				type: "list",
				message: "Pick an animal class",
	      // databaseResults.map((result) => result.name) will return an array of all of the animal class names
	      // the inquirer choices field requires an array, and that's what we're giving it here
				choices: animalClassNames,
				name: "animalClass"
			}
		]).then(function(answers){
			console.log("Input from the Inquirer options ")
			// logging the answers from inquirer
			// in this case, the answer that you gave from the list option can be accessed by using answers.vegetable
			console.log(answers)
			console.log(answers.animalClass);

			/*
				the \' that you see in the query below is representing an escape character.
				Since the string is wrapped in single quotes,
				and MySql queries require VARCHAR types to be in single quotes,
				then we must accomodate that here
				comment in the query to see how it looks.
				This is how you would run the query in MySql Developer
				the backwards slash is how you accomodate inserting a single quote in a string that's already encapsulated in a single quote
			*/
			// lets do some additional functionality and get all of the animals that belong to that animal class
			databaseConnection.query('SELECT id FROM classes_for_animals WHERE name=\'' + answers.animalClass + '\'', function(errTwo, databaseResultsTwo){

				console.log(databaseResultsTwo)
				const animalClassId = databaseResultsTwo[0].id;

				// remember this query from the many-to-many pivot table lesson?
				databaseConnection.query('SELECT animals.name FROM animals INNER JOIN animals_classes ON animals_classes.animal_id=animals.id WHERE animals_classes.class_id=' + animalClassId, function(errThree, databaseResultsThree){

					console.log(databaseResultsThree.map((animal) => animal.name));
					// ending the database connection once im done querying
					databaseConnection.end();
				});

			});
	});
})
