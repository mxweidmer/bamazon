
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
    display(main);

});

function main() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you would like to purchase? (q to quit)",
            name: "item",
            validate: function (value) {
                if (isNaN(value) === false || value === "q") {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (stepOne) {
        if (stepOne.item === "q") {
            console.log("Goodbye");
            connection.end();
        } else {
            inquirer.prompt([
                {
                    type: "input",
                    message: "How many would you like to buy?",
                    name: "quantity",
                    validate: function (value) {
                        if (isNaN(value) === false || value === "q") {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function (stepTwo) {
                if (stepTwo.quantity === "q") {
                    console.log("Goodbye");
                    connection.end();
                } else {
                    makePurchase(stepOne.item, stepTwo.quantity);
                }
            })
        }
    })
}

function display(func) {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            var table = new Table({
                head: ["ID", "Product", "Department", "Price"]
            });

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].id, res[i].product, res[i].department, res[i].price])
            }
            console.log(table.toString());
            func();
        }
    )
}

function makePurchase(item, quantity) {
    console.log(item, quantity);
}