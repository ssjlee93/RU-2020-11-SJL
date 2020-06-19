# RU-2020-11-SJL

![MySQL](https://img.shields.io/static/v1?label=SQL&message=MySQL&color=green)

![Inquirer](https://img.shields.io/static/v1?label=npm&message=inquirer&color=brightgreen)

![mysql](https://img.shields.io/static/v1?label=npm&message=mysql&color=brightgreen)

![Node.js](https://img.shields.io/static/v1?label=Node.&message=js&color=brightgreen)

## Employəə Trackər
This command-line application trɑcks əmployəəs using MySQL and Node.js. In the application,the user can view, add, update, and delete əmployəəs. 

## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Developments](#developments)
* [Notes](#notes)

## Installation 
* Pull from the repo 
```
npm install
``` 
* required npms: Node.js, MySQL, MySQL Workbench 

## Usage 
1. Open terminal at the correct directory
```
node index
```
2. Follow the command-line instructions 

![01](/01.PNG)

![02](/02.PNG)

![03](/03.PNG)

![04](/04.PNG)

![05](/05.PNG)

## License 

MIT?

## Developments 

#### Adding əmployəəs 
 I want to show a table with id from roles table and id from əmployəə table. When I ask you to add, I am asking for the id of the role that an əmployəə  takes and an id of manager  - another əmployəə. I could not find a way to print both id columns. I could only show the id of the roles. 

#### Updating
When updating, I want the user to leave the fields empty if the fields will not be updated. I could not find a way to leave the fields empty by default. 

#### View the total utilized budget of a department 
I did not have enough time and energy to implement this feature. The idea is to use connection.query, then loop the results[i].salary and add them all together. I might need to use Array.reduce() method for the sum. 

