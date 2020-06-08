drop database if exists employee_db;
create database employee_db;
use employee_db;

create table departments (
id int not null auto_increment,
primary key (id),
name varchar(30) not null
); 

create table roles (
id int not null auto_increment,
primary key (id),
title varchar(30) not null,
salary decimal (10, 2) not null,
department_id int not null references departments(id)
); 

create table employees (
id int not null auto_increment,
primary key (id),
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null references roles(id),
manager_id int references employees(id)
); 