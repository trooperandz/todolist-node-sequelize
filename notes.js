// Users
use todo_sequelize;
insert into Users (username, createdAt, updatedAt) values ('Matt', '2016-11-26 00:00:00', '2016-11-26 00:00:00'),
('Marta', '2016-11-26 00:00:00', '2016-11-26 00:00:00');
SELECT * FROM todo_sequelize.Users;


// Tasks
use todo_sequelize;

insert into Tasks (title, CategoryId, UserId, createdAt, updatedAt) values ('Get battery', 2, 1, '2016-11-26 00:00:00', '2016-11-26 00:00:00'), ('Pick up cat', 3, 2, '2016-11-26 00:00:00', '2016-11-26 00:00:00');

SELECT * FROM todo_sequelize.Tasks;

// Categories
use todo_sequelize;

insert into Categories (title, createdAt, updatedAt) values ('Banking', '2016-11-26 00:00:00', '2016-11-26 00:00:00'),
('Miscellaneous', '2016-11-26 00:00:00', '2016-11-26 00:00:00');

SELECT * FROM todo_sequelize.Categories;

// Original tasks list
<ul>
  {{#each tasks}}
    <li>Task: {{dataValues.task}}</li>
    <li>User: {{dataValues.User.username}}</li>
    <li>Category: {{dataValues.Category.title}}</li>
  {{/each}}
</ul>