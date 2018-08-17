CREATE TABLE Collection
(
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
);

INSERT INTO Collection('name', 'description')
VALUES
('Sales', 'Launch videos, blog posts, and other communications'),
('Marketing', 'Web and tv campaigns');

CREATE TABLE Project
(
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  collectionId INTEGER,
  FOREIGN KEY(collectionId) REFERENCES collection(id)
);

INSERT INTO Project('name', 'description', 'collectionId')
VALUES
('Cold prospect emails', 'Short intro videos, get to know Slope', '1'),
('Business cards', 'Fancy cards for the team', '2'),
('Facebook campaign', 'Video and stills for the Facebook campaign', '2'),
('Local TV ad campaign', 'Short video ads for the local TV market', '2');

CREATE TABLE Task
(
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  dueDate INTEGER,
  projectId INTEGER,
  type VARCHAR(10),
  FOREIGN KEY(projectId) REFERENCES project(id)
);

INSERT INTO Task('name', 'description', 'projectId', 'type')
VALUES
('CEO Email Video', 'Brian introduces himself', '1', 'content'),
('Photo shoot', 'Photo content for the back of our business cards', '2', 'content'),
('Short vid for use the right tool', 'Lena w/ Cello revisit', '1', 'content'),
('Schedule shoot', 'Find a venue and get approval', '1', 'todo');
