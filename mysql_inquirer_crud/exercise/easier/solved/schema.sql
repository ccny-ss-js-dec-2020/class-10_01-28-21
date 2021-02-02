CREATE TABLE sesame_street_characters (
  name VARCHAR(255) NOT NULL UNIQUE,
  species VARCHAR(255),
  performedBy VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
