CREATE TABLE users (
  id INT auto_increment PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE users_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  favorite_song VARCHAR(255) NOT NULL,
  favorite_movie VARCHAR(255) NOT NULL,
  favorite_pizza VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
