CREATE TABLE blogs (
	id SERIAL,
	creator_name VARCHAR(255),
	creator_user_id SERIAL,
	title VARCHAR(255),
	body TEXT,
	date_created Timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (creator_user_id) REFERENCES users(id)
);

CREATE TABLE users (
	id SERIAL NOT NULL,
	password VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	Primary Key (id)
);