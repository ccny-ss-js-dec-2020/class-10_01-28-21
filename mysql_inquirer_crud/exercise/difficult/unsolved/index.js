/*
  - If you haven't already, create a users table
  - If you haven't already, create a users_profiles table
  _ If you haven't already, there should be a 1 to 1 foreign key constraint
    between these 2 tables

	- Create a crud application using inquirer, mysql & these 2 tables
	- All CRUD is done through inquirer
  - There will be a bunch of nested inquirer and database calls, as we're doing everything in order

	1. Create a User
	2. Create a profile for that user
	3. Update the profile of that user
	4. Delete the profile and then the user

	Solved Structure:

	- inquirer prompts to create user
		- mysql insert into users table
		- inquirer promps to create a profile
			- mysql select user by username to get users id
				- mysql insert into profile table
			- inquirer prompts what field in the profile table you would like to
			  update, and then what value you would like to update
				- mysql select user by username to get users id
					- mysql update profile table
				- inquirer prompts which user id you would like to delete
					- mysql select user by username to get users id
						- mysql delete profile by user id
						- mysql delete user by id

*/
