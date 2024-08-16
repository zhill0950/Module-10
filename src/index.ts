import inquirer from "inquirer";
import { QueryResult } from "pg";
import { pool, connectToDB } from "./connection";

// Add a department to the table
addDept(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            },
        ])
        .then(async (answers) => {
            try {
                await pool.query(
                    'INSERT INTO departments (name) VALUES ($1)',
                    [answers.name]
                );
                console.log('Department added');
            } catch (error) {
                console.error('Error adding department', error);
            }
        });
}

// Add a role to the table
addRole(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary of the role:',
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the department ID of the role:',
            },
        ])
        .then(async (answers) => {
            try {
                await pool.query(
                    'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
                    [answers.title, answers.salary, answers.department_id]
                );
                console.log('Role added');
            } catch (error) {
                console.error('Error adding role', error);
            }
        });
}

// Add an employee to the table
addEmployee(): void {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Enter the role ID of the employee:',
            },
            {
                type: 'number',
                name: 'manager_id',
                message: 'Enter the manager ID of the employee:',
            },
        ])
        .then(async (answers) => {
            try {
                await pool.query(
                    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
                );
                console.log('Employee added');
            } catch (error) {
                console.error('Error adding employee', error);
            }
        });
}

// View all departments
viewDepts(): void {
    pool.query('SELECT * FROM departments', (error: Error, result: QueryResult) => {
        if (error) {
            console.error('Error viewing departments', error);
        } else {
            console.table(result.rows);
        }
    });
}

// View all roles
viewRoles(): void {
    pool.query('SELECT * FROM roles', (error: Error, result: QueryResult) => {
        if (error) {
            console.error('Error viewing roles', error);
        } else {
            console.table(result.rows);
        }
    });
}

// View all employees
viewEmployees(): void {
    pool.query('SELECT * FROM employees', (error: Error, result: QueryResult) => {
        if (error) {
            console.error('Error viewing employees', error);
        } else {
            console.table(result.rows);
        }
    });
}