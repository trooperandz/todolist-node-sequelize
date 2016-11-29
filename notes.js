// Users
use todo_sequelize;
INSERT INTO Users (firstName, lastName, userName, email, password, createdAt, updatedAt) VALUES ('Matthew', 'Holland', 'mholland', 'mtholland10@gmail.com', '$2a$10$pdZFtat4ArDPhrCnG9k2CeVzm61.PS9KQHNuTv1CcJej22axqio7i', '2016-11-26 00:00:00', '2016-11-26 00:00:00'), ('Marta' 'Lingura', 'mlingura', 'martal@gmail.com', '$2a$10$iBHfyrSTMX6E483GNwiE7ut7ztZtNPHzsHYIH0beNUdffq6E6Lge2', '2016-11-26 00:00:00', '2016-11-26 00:00:00');
SELECT * FROM todo_sequelize.Users;


// Tasks
use todo_sequelize;

INSERT INTO Tasks (title, CategoryId, UserId, createdAt, updatedAt) VALUES ('Fill out travel forms', 2, 1, '2016-11-26 00:00:00', '2016-11-26 00:00:00') ('Get car battery', 2, 2, '2016-11-26 00:00:00', '2016-11-26 00:00:00'), ('Pick up cat', 3, 2, '2016-11-26 00:00:00', '2016-11-26 00:00:00');

SELECT * FROM todo_sequelize.Tasks;

// Categories
use todo_sequelize;

INSERT INTO Categories (title, createdAt, updatedAt) VALUES ('Banking', '2016-11-26 00:00:00', '2016-11-26 00:00:00'),
('Miscellaneous', '2016-11-26 00:00:00', '2016-11-26 00:00:00'), ('Music', '2016-11-26 00:00:00', '2016-11-26 00:00:00'),
('Social', '2016-11-26 00:00:00', '2016-11-26 00:00:00');

SELECT * FROM todo_sequelize.Categories;

// Original tasks list
<ul>
  {{#each tasks}}
    <li>Task: {{dataValues.task}}</li>
    <li>User: {{dataValues.User.username}}</li>
    <li>Category: {{dataValues.Category.title}}</li>
  {{/each}}
</ul>