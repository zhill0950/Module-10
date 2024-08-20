import inquirer from "inquirer";
import { pool, connectToDB } from "./connection";
class EmployeeDatabaseManager {
    constructor() {
        connectToDB();
    }
    addDept() {
        inquirer
            .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        })
            .then(async (answers) => {
            try {
                await pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
                console.log('Department added');
            }
            catch (error) {
                console.error('Error adding department', error);
            }
        });
    }
    addRole() {
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
                await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]);
                console.log('Role added');
            }
            catch (error) {
                console.error('Error adding role', error);
            }
        });
    }
    addEmployee() {
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
                message: 'Enter the manager ID of the employee (or leave blank if none):',
                default: null
            },
        ])
            .then(async (answers) => {
            try {
                await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                console.log('Employee added');
            }
            catch (error) {
                console.error('Error adding employee', error);
            }
        });
    }
    viewDepts() {
        pool.query('SELECT * FROM department', (error, result) => {
            if (error) {
                console.error('Error viewing departments', error);
            }
            else {
                console.table(result.rows);
            }
        });
    }
    viewRoles() {
        pool.query('SELECT * FROM role', (error, result) => {
            if (error) {
                console.error('Error viewing roles', error);
            }
            else {
                console.table(result.rows);
            }
        });
    }
    viewEmployees() {
        pool.query('SELECT * FROM employee', (error, result) => {
            if (error) {
                console.error('Error viewing employees', error);
            }
            else {
                console.table(result.rows);
            }
        });
    }
    updateEmployeeRole() {
        inquirer
            .prompt([
            {
                type: 'number',
                name: 'employee_id',
                message: 'Enter the employee ID to update:',
            },
            {
                type: 'number',
                name: 'new_role_id',
                message: 'Enter the new role ID:',
            },
        ])
            .then(async (answers) => {
            try {
                await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.new_role_id, answers.employee_id]);
                console.log('Employee role updated');
            }
            catch (error) {
                console.error('Error updating employee role', error);
            }
        });
    }
    startApp() {
        inquirer
            .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ],
        })
            .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    this.viewDepts();
                    break;
                case 'View all roles':
                    this.viewRoles();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'Add a department':
                    this.addDept();
                    break;
                case 'Add a role':
                    this.addRole();
                    break;
                case 'Add an employee':
                    this.addEmployee();
                    break;
                case 'Update an employee role':
                    this.updateEmployeeRole();
                    break;
                case 'Exit':
                    pool.end();
                    console.log('Goodbye!');
                    process.exit(0);
                    break;
                default:
                    console.log('Invalid choice, please try again.');
                    this.startApp();
            }
        });
    }
}
const manager = new EmployeeDatabaseManager();
manager.startApp();
