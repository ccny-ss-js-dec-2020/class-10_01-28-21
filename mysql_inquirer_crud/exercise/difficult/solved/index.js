/* <------------------------------------------------------------------> */

//setup for connection database

//node modules to request
var mysql = require('mysql');
var inquirer = require('inquirer');

const databaseConnection = mysql.createConnection(process.env.LOCAL_DATABASE);
databaseConnection.connect();
/* <------------------------------------------------------------------> */

console.log("Create your user");
inquirer.prompt([
	{
		type: "input",
		message: "What is your first name?",
		name: "first_name"
	},
	{
		type: "input",
		message: "What is your last name?",
		name: "last_name"
	},
	{
		type: "input",
		message: "What is your email?",
		name: "email"
	},
	{
		type: "input",
		message: "What is your username?",
		name: "username"
	},
	{
		type: "password",
		message: "What is your password?",
		name: "password"
	}
]).then((create_user) => {
	const first_name = create_user.first_name;
	const last_name = create_user.last_name;
	const email = create_user.email;
	const username = create_user.username;
	const password = create_user.password;

	let createUserQueryString = 'INSERT INTO users (first_name, last_name, email, username, password)';
	createUserQueryString += ' VALUES (';
	createUserQueryString += "'"+first_name+"',";
	createUserQueryString += "'"+last_name+"',";
	createUserQueryString += "'"+email+"',";
	createUserQueryString += "'"+username+"',";
	createUserQueryString += "'"+first_name+"'";
	createUserQueryString += ')';

	databaseConnection.query(createUserQueryString, function(create_user_err, create_user_result) {
	});
	console.log("User Created");
	console.log("Create your profile")
	inquirer.prompt([
		{
			type: "input",
			message: "What is your favorite movie?",
			name: "movie"
		},
		{
			type: "input",
			message: "What is your favorite song?",
			name: "song"
		},
		{
			type: "input",
			message: "What is your favorite slice of pizza?",
			name: "pizza"
		}
	]).then((create_profile) => {
		databaseConnection.query("SELECT id FROM users WHERE username='" + create_user.username + "'", (selectUserErr, selectUserRes) => {
			let insertIntoProfileString = 'INSERT INTO users_profiles (favorite_movie, favorite_song, favorite_pizza, user_id)';
			insertIntoProfileString += ' VALUES (';
			insertIntoProfileString += "'"+create_profile.movie+"',";
			insertIntoProfileString += "'"+create_profile.song+"',";
			insertIntoProfileString += "'"+create_profile.pizza+"',";
			insertIntoProfileString += "'"+selectUserRes[0].id+"'";
			insertIntoProfileString += ')';
			databaseConnection.query(insertIntoProfileString, function(create_user_profile_err, create_user_profile_result) {
				if(create_user_profile_err){
					throw new Error(create_user_profile_err)
				}
			});
		});
		console.log("User Profile Created")
		inquirer.prompt([
			{
				type: "list",
				message: "Which field would you like to update?",
				choices: ["Favorite Movie", "Favorite Song", "Favorite Slice of Pizza"],
				name: "field_update_choice"
			},
			{
				type: "input",
				message: "What is the new value?",
				name: "update_value"
			}
		]).then((update_profile) => {
			let field;
			switch(update_profile.field_update_choice){
				case 'Favorite Movie':
					field = "favorite_movie";
					break;
				case 'Favorite Song':
					field = "favorite_song";
					break;
				case 'Favorite Slice of Pizza':
					field = "favorite_pizza";
					break;
			}
			databaseConnection.query("SELECT id FROM users WHERE username='" + create_user.username + "'", function(selectUserErr, selectUserRes){
				databaseConnection.query('UPDATE users_profiles SET ' + field + '=\''+update_profile.update_value+'\' WHERE user_id=' + selectUserRes[0].id, function(update_profile_err, update_profile_result) {
					if(update_profile_err){
						throw new Error(update_profile_err);
					}
				});
			});
			console.log("Profile Updated")
			inquirer.prompt([
				{
					type: "input",
					message: "Which user would you like to delete?",
					name: "update_value"
				}
			]).then((delete_profile) => {
				databaseConnection.query("SELECT id FROM users WHERE username='" + create_user.username + "'", (selectUserErr, selectUserRes) => {
					databaseConnection.query('DELETE FROM users_profiles WHERE user_id=' + selectUserRes[0].id, function(delete_profile_err, delete_profile_result) {
						console.log("User Profile Deleted")
						databaseConnection.query('DELETE FROM users WHERE id=' + selectUserRes[0].id, function(delete_profile_err, delete_profile_result){
							console.log("User Deleted");
							databaseConnection.end();
						});
					});
				});
			});
		});
	});
});
