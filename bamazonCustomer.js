
var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "oo@zw1!HPcXc7ZVZ",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
});