insert into departments (name)
value ("Engineering"),("Marketing"),("Business"),("Legal"),("Design"),("Human Resources");
insert into roles (title, salary, department_id)
value ("manager", 900000, 1),("full stack developer", 100000, 1),
("manager", 990000, 2),("financial analyst", 110000, 2),
("president", 9999999.99, 3),("manager", 999000, 3),("client acquisitioner", 111000,3),
("lawyer", 999900, 4),("paralegal", 111100, 4),
("manager", 999990, 5),("3D grahics artist", 111110, 5),
("manager", 999999, 6),("recruiter", 111111,6);
insert into employees (first_name, last_name, role_id, manager_id)
value("A", "One", 1, 5),("A1", "One1", 2, 1),
("B", "Two", 3, 5),("B1", "Two1", 4, 3),
("C","Three",5, null),("C1", "Three1", 6, 3),("C2", "Three2", 7, 3),
("D","Four",8, 5),
("E","Five",10, 5),
("F","Six",12, 5) ;

select name, title, salary, first_name, last_name from departments 
inner join roles on departments.id=roles.department_id
inner join employees on roles.id=role_id;


select title, salary, name from roles 
inner join departments on roles.department_id=departments.id;
select first_name, last_name, title, salary, name from employees 
inner join roles on employees.role_id=roles.id 
inner join departments on roles.department_id=departments.id;