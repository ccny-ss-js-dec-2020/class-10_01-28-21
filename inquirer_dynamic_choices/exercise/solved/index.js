//importing mysql because we'll be interacting with a mysql database
var mysql = require('mysql');
//importing inquirer into our page by using the command 'npm install inquirer --save'
var inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();

databaseConnection.query('SELECT * FROM movies', function(err, databaseResults){
	if(err){
		throw new Error(err)
	}
	const movieNames = databaseResults.map((movie) => movie.title)

	// calling the inquirer prompt function and setting what we would like to prompt
	inquirer.prompt([
			// inquirer will prompt us with a list to choose from based on the array values that you provide
			// you can only choose one value from a list
			{
				type: "list",
				message: "Pick a movie",
	      // databaseResults.map((result) => result.name) will return an array of all of the animal class names
	      // the inquirer choices field requires an array, and that's what we're giving it here
				choices: movieNames,
				name: "movie"
			}
		]).then(function(answers){
			/*
				the \' is representing an escape character.
				Since the string is wrapped in single quotes,
				and MySql queries require VARCHAR types to be in single quotes,
				then we must accomodate that here
				comment in the query to see how it looks.
				This is how you would run the query in MySql Developer
				the backwards slash is how you accomodate inserting a single quote in a string that's already encapsulated in a single quote
			*/
			const query = 'SELECT * FROM movies WHERE title=\'' + answers.movie + '\'';
			//console.log(query)
			databaseConnection.query(query, function(movieErr, movieResults){
				console.log(movieResults[0])
				// ending the database connection since we're currently done querying the database
				databaseConnection.end();
			});
		});
})
