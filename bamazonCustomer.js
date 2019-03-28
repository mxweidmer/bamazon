
var inquirer = require("inquirer");
var Table = require("cli-table3");
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
    display();
});

function display() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            var table = new Table({
                head: ["ID", "Product", "Department", "Price"]
            });

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].id, res[i].product, res[i].department, res[i].price])
            }
            console.log(table.toString());
        }
    )
}