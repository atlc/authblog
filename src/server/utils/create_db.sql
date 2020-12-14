DROP DATABASE IF EXISTS authblog;
CREATE DATABASE authblog;
USE authblog;


DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    avatar VARCHAR(128),
    password VARCHAR(64) NOT NULL,
    roles VARCHAR(64) NOT NULL DEFAULT "guest", -- // Going to be stringified array of permissions: guest, user, ???, admin, superadmin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Users (firstname, lastname, email, password, roles) VALUES ("Andrew", "Cartwright", "me@example.com", "$2b$10$H1JKIweGIZ7e4LNmC7Dzt.zfGDXiBkldpQYXWsjv5DIvhxa/iwT96", "[\"user\",\"admin\",\"superadmin\"]");


DROP TABLE IF EXISTS authtokens;
CREATE TABLE authtokens (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    token TEXT,
	expires_at DATETIME,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES Users(id)
);
INSERT INTO authtokens (userid, token) VALUES (1, "aaaaaaaaahhhhhhhhhhhhhh");
INSERT INTO authtokens (userid) VALUES (1);

DROP TABLE IF EXISTS Blogs;
CREATE TABLE Blogs (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(256) NOT NULL,
	content TEXT NOT NULL,
	userid INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (userid) REFERENCES Users(id)
);
INSERT INTO Blogs (title, content, userid) VALUES
	('My Journey Through Covalence: Coding While Listening to 90s Alt', "Shakedown 1979, cool kids never have the time \n On a live wire right up off the street \n You and I should meet \n June bug skipping like a stone \n With the headlights pointed at the dawn \n We were sure we'd never see an end to it all \n And I don't even care to shake these zipper blues \n And we don't know just where our bones will rest \n To dust I guess \n Forgotten and absorbed into the earth below", 1),
    ('Budget Prospecting & Some Annoying Folk Songs', "She'll be coming round the mountain\nWhen she comes\n\n(Toot, toot!)\n\nShe'll be coming round the mountain\nWhen she comes\n\n(Toot, toot!)\n\nShe'll be coming round the mountain,\nShe'll be coming round the mountain,\nShe'll be coming round the mountain\nWhen she comes\n\n(Toot, toot!)	She'll be driving six white horses\nWhen she comes\n\n(Whoa back!)\n\nShe'll be driving six white horses\nWhen she comes\n\n(Whoa back!)\n\nShe'll be driving six white horses,\nShe'll be driving six white horses,\nShe'll be driving six white horses\nWhen she comes\n\n(Whoa back! Toot, toot!)\n\nOh, we'll all go out to meet her\nWhen she comes\n\n(Hi babe!)\n\nOh, we'll all go out to meet her\nWhen she comes\n\n(Hi babe!)\n\nOh, we'll all go out to meet her,\nWe'll all go out to meet her,\nWe'll all go out to meet her\nWhen she comes\n\n(Hi babe!\nWhoa back! Toot, toot!)\n\nShe'll be wearing red pajamas\nWhen she comes\n\n(Scratch, scratch)\n\nShe'll be wearing red pajamas\nWhen she comes\n\n(Scratch, scratch)\n\nShe'll be wearing red pajamas,\nShe'll be wearing red pajamas,\nShe'll be wearing red pajamas\nWhen she comes\n\n(Scratch, scratch, Hi babe!\nWhoa back! Toot, toot!)\n\nShe will have to sleep with Grandma\nWhen she comes\n\n(She snores!)\n\nShe will have to sleep with Grandma\nWhen she comes\n\n(She snores!)\n\nShe will have to sleep with Grandma,\nShe'll have to sleep with Grandma,\nShe will have to sleep with Grandma\nWhen she comes\n\n(She snores!\nScratch, scratch, Hi babe!\nWhoa back! Toot, toot!)", 1),
    ("A Harrowin' Tale o' th' High Seas!", "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.", 1),
    ("Culinary Tips from an Actor's Perspective", "Whoa, whoa, whoa. There's still plenty of meat on that bone. Now you take this home, throw it in a pot, add some broth, a potato. Baby, you've got a stew going...  Let me tell you a little story about acting. I was doing this Showtime movie, Hot Ice with Anne Archer, never once touched my per diem. I'd go to Craft Service, get some raw veggies, bacon, Cup-A-Soup... baby, I got a stew going.", 1),
    ('My Journey As Mrs. Featherbottom', "Narrator : While on the set of Wrench, Tobias had snuck into the costume closet and disguised himself as an English nanny in an attempt to see his daughter and prove to his wife he had what it took to become a successful actor. It was the exact same plot as Mrs. Doubtfire...\nTobias Fünke : [after Lindsay answers the door]  Why, hellooo. My name is Mrs. Phlyddia Featherbottom, the agency sent me over.\nLindsay Funke : Uh... I didn't contact any agency.\nTobias Fünke : But I can cook and clean and even take care of the little ones. In fact, if it comes in handy... I can sing a song or two...\nNarrator : And maybe a little Mary Poppins to throw in the mix...\nTobias Fünke : A squirt of frosting down the throat helps to take your medication / In the most delicious way...", 1),
    ('How Much Do I Charge For Acting Classes?', 'Check this out. $1,100 is exactly what I charge for acting classes.', 1) 
;


DROP TABLE IF EXISTS Tags;
CREATE TABLE Tags (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Tags (name) VALUES ('coding'), ('90s alt rock'), ('mysql'), ('react js'), ('node js'), ('Birmingham, AL'), ('gold prospecting'), ('sailing'), ('acting'), ('cooking'), ('Carl Weathers'), ('Arrested Development');


DROP TABLE IF EXISTS BlogTags;
CREATE TABLE BlogTags (
	blogid INT NOT NULL,
    tagid INT NOT NULL,
    FOREIGN KEY (blogid) REFERENCES Blogs(id),
    FOREIGN KEY (tagid) REFERENCES Tags(id),
    PRIMARY KEY (blogid, tagid)
);
INSERT INTO BlogTags (blogid, tagid) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 7),
    (3, 8),
    (4, 10), (4, 11), (4, 12),
    (5, 9), (5, 10), (5, 11)
;


DROP PROCEDURE IF EXISTS spBlogTags;
delimiter $$
	CREATE PROCEDURE spBlogTags(blogid int)
		BEGIN
			SELECT 
				*
			FROM BlogTags b
			JOIN Tags t on b.tagid = t.id WHERE b.blogid = blogid;
END $$
delimiter ;


DROP PROCEDURE IF EXISTS spAllBlogTags;
delimiter $$
	CREATE PROCEDURE spAllBlogTags()
		BEGIN
			SELECT 
				b.blogid as BlogID, t.id as TagID, t.name as Tag 
			FROM BlogTags b
			JOIN Tags t on b.tagid = t.id;
END $$
delimiter ;

DROP PROCEDURE IF EXISTS spBlogAuthors;
delimiter $$
	CREATE PROCEDURE spBlogAuthors(blogid int)
		BEGIN
			IF blogid IS NULL THEN -- Allowing for """optional""" parameter passing to return all or just one
				SELECT 
					b.id, b.title, b.content, b.authorid, a.name as AuthorName, a.email as AuthorEmail, b.created_at, b.updated_at
				FROM Blogs b
				JOIN Authors a on b.authorid = a.id;
			ELSE
				SELECT 
					b.id, b.title, b.content, b.authorid, a.name as AuthorName, a.email as AuthorEmail, b.created_at, b.updated_at
				FROM Blogs b
				JOIN Authors a on b.authorid = a.id
                WHERE b.id = blogid;
			END IF;
END $$
delimiter ;

SELECT * FROM authtokens WHERE userid = '1';
SELECT * FROM Users;
SELECT * FROM Users WHERE email = 'me2@example.com';


