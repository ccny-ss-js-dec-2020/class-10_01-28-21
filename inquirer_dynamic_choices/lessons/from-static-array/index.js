//importing inquirer into our page by using the command 'npm install inquirer --save'
var inquirer = require('inquirer');

/* Static Array */
var vegetables = ['celery', 'broccoli', 'brussel sprouts', 'cucumber', 'spinach', 'kale'];

//calling the inquirer prompt function and setting what we would like to prompt
inquirer.prompt([
		// inquirer will prompt us with a list to choose from based on the array values that you provide
		// you can only choose one value from a list
		{
			type: "list",
			message: "Pick a vegetable",
      // merely inserting the vegetables array into the choices field here
			choices: vegetables,
			name: "vegetable"
		}
	]).then(function(answers){
		console.log("Input from the Inquirer options ")
		// logging the answers from inquirer
		// in this case, the answer that you gave from the list option can be accessed by using answers.vegetable
		console.log(answers)
		console.log(answers.vegetable)
});
