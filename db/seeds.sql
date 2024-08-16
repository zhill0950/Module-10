INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 100000, 1),
    ('Sales Lead', 80000, 2),
    ('Marketing Manager', 90000, 3),
    ('Accountant', 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Charlie', 'Brown', 3, 2),
    ('David', 'Jones', 4, 3);