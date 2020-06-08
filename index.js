const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "employee_db"
})

connection.connect(function (error) {
    if (error) throw error;
    start();
})

function start() {
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ["View", "Add", "Update", "Delete", "Exit"]
    }).then(answer => {
        switch (answer.start) {
            case "View":
                view();
                break;
            case "Add":
                add();
                break;
            case "Update":
                update();
                break;
            case "Delete":
                del();
                break;
            default:
                connection.end();
        }
    })
}

function view() {
    inquirer.prompt({
        name: "view",
        type: "list",
        message: "Which table would you like to view?",
        choices: ["Departments", "Roles", "Employees", "Manager", "All", "Go back", "Exit"]
    }).then(answer => {
        switch (answer.view) {
            case "Manager":
                viewManager();
                break;
            case "All":
                viewAll();
                break;
            case "Go back":
                start();
                break;
             case "Exit":
                connection.end();
                break;
            default:
                connection.query(`SELECT * FROM ${answer.view}`, viewTable);
        }
    })
}

function viewTable(error, results) {
    if (error) throw error;
    console.table(results);
    view();
}

function viewAll() {
    connection.query("SELECT * FROM departments INNER JOIN roles ON departments.id=roles.department_id INNER JOIN employees ON roles.id=role_id;", viewTable);
}

function viewManager() {
    connection.query("SELECT employees.id, name, title, first_name, last_name, manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id", (error, results) => {
        if (error) throw error;
        console.table(results);

        inquirer.prompt({
            name: "manager",
            type: "number",
            message: "ID of the manager to view"
        }).then(answer => {
            connection.query(`SELECT first_name, last_name FROM employees WHERE manager_id=${answer.manager}`, viewTable);
        })
    })
}

function add() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "To which table would you like to add?",
        choices: ["Departments", "Roles", "Employees", "Go back", "Exit"]
    }).then(answer => {
        switch (answer.add) {
            case "Departments":
                addDepartment();
                break;
            case "Roles":
                addRole();
                break;
            case "Employees":
                addEmployee();
                break;
            case "Go back":
                start();
                break;
            default:
                connection.end();
        }
    })
};

function logAdded(error, results) {
    if (error) throw error;
    console.log(results.affectedRows + " row added");
    add();
}

function addDepartment() {
        inquirer.prompt({
            name: "name",
            message: "Name of the department to add",
            type: "input"
        }).then(answer => {
            connection.query(`INSERT INTO departments SET name='${answer.name}'`, logAdded);
        })
}

function addRole() {
    connection.query("SELECT * FROM departments", function (error, results) {
        if (error) throw error;
        console.table(results)

        inquirer.prompt([
            {
                name: "title",
                message: "Title of the role to add",
                type: "input"
            },
            {
                name: "salary",
                message: "Salary of the role to add",
                type: "number"
            },
            {
                name: "department_id",
                message: "ID of the department this role belongs",
                type: "number"
            }
        ]).then(answer => {

            connection.query("insert into roles set ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                logAdded)
        })
    })
}

function addEmployee() {
    connection.query("SELECT roles.id, title, first_name, last_name FROM roles LEFT JOIN employees ON roles.id = role_id", function (error, results) {
        if (error) throw error;
        console.table(results)
        inquirer.prompt([
            {
                name: "first_name",
                message: "First name of the employee to add",
                type: "input"
            },
            {
                name: "last_name",
                message: "Last name of the employee to add",
                type: "input"
            },
            {
                name: "role_id",
                message: "ID of the role this employee has",
                type: "number"
            },
            {
                name: "manager_id",
                message: "ID of other employee who manages this employee",
                type: "number",
                default: "null"
            }
        ]).then(answer => {

            connection.query("insert into employees set ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                logAdded)
        })
    })
}

function logUpdated(error, results) {
    if (error) throw error;
    console.log(results.changedRows + " row updated");
    update();
}

function update() {
    inquirer.prompt({
        name: "update",
        type: "list",
        message: "Which table would you like to update?",
        choices: ["Departments", "Roles", "Employees", "Go back", "Exit"]
    }).then(answer => {
        switch (answer.update) {
            case "Departments":
                updateDepartment();
                break;
            case "Roles":
                updateRole();
                break;
            case "Employees":
                updateEmployee();
                break;
            case "Go back":
                start();
                break;
            default:
                connection.end();
        }
    })
}

function updateDepartment() {
    connection.query("SELECT * FROM departments", (error, results) => {
        if (error) throw error;
        console.table(results);

        inquirer.prompt([
            {
                name: "id",
                type: "number",
                message: "ID of the department to update"
            },
            {
                name: "name",
                type: "input",
                message: "New name of the department"
            }
        ]).then(answer => {
            connection.query(`UPDATE departments SET name='${answer.name}' WHERE id=${answer.id}`, logUpdated)
        })
    })
}

function updateRole() {
    connection.query("SELECT * FROM roles", (error, results) => {
        if (error) throw error;
        console.table(results);

        inquirer.prompt([
            {
                name: "id",
                type: "number",
                message: "ID of the role to update"
            },
            {
                name: "title",
                type: "input",
                message: "New title of the role to update"
            },
            {
                name: "salary",
                type: "number",
                message: "New salary of the role to update"
            },
            {
                name: "department_id",
                type: "number",
                message: "New ID of the department this role belongs"
            }
        ]).then(answer => {
            console.log(answer.salary)
            connection.query(`UPDATE roles SET ? WHERE id=${answer.id}`,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                logUpdated)
        })
    })
}

function updateEmployee() {
    connection.query("SELECT * FROM employees", (error, results) => {
        if (error) throw error;
        console.table(results);

        inquirer.prompt([
            {
                name: "id",
                type: "number",
                message: "ID of the employee to update"
            },
            {
                name: "first_name",
                type: "input",
                message: "New first name of the employee to update"
            },
            {
                name: "last_name",
                type: "input",
                message: "New last name of the role to update"
            },
            {
                name: "role_id",
                type: "number",
                message: "New ID of the role this employee belongs"
            },
            {
                name: "manager_id",
                message: "New ID of other employee who manages this employee",
                type: "number",
                default: "null"
            }
        ]).then(answer => {
            console.log(answer.salary)
            connection.query(`UPDATE roles SET ? WHERE id=${answer.id}`,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                logUpdated);
        })
    })
}

function logDeleted(error, results) {
    if (error) throw error;
    console.table(results.affectedRows + " deleted");
    del();
}

function del() {
    inquirer.prompt({
        name: "delete",
        type: "list",
        message: "Which table would you like to delete?",
        choices: ["Departments", "Roles", "Employees", "Go back", "Exit"]
    }).then(answer => {
        switch (answer.delete) {
            case "Go back":
                start();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                connection.query(`SELECT * FROM ${answer.delete}`, (error, results) => {
                    if (error) throw error;
                    console.table(results)
                    let tableName = answer.delete;
                    inquirer.prompt({
                        name: "id",
                        type: "number",
                        message: "ID of the department to delete"
                    }).then(answer => {
                        connection.query(`DELETE FROM ${tableName} WHERE id=${answer.id}`, logDeleted)
                    })
                })
        }
    })
}
