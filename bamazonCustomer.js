
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
                    console.log("\nGoodbye");
                    connection.end();
                } else {
                    makePurchase(parseInt(stepOne.item), parseInt(stepTwo.quantity));
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
                head: ["ID", "Product", "Department", "Price", "Stock"]
            });

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity]);
            }
            console.log(table.toString());
            func();
        }
    )
}

function makePurchase(item, quantity) {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            var product;
            for (var i = 0; i < res.length; i++) {
                if (item === res[i].id) {
                    product = res[i];
                }
            }

            if (!product) {
                console.log("That item is not in stock.");
                display(main);
            } else if (product.quantity >= quantity) {
                connection.query(
                    "UPDATE products set ? WHERE ?",
                    [
                        {
                            quantity: product.quantity - quantity
                        },
                        {
                            id: item
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("\nYour purchase total was: " + quantity * product.price + "\n")
                        display(main);
                    }
                )
            } else if (product.quantity < quantity) {
                console.log("\nInsufficient quantity!\n");
                display(main);
            }
        }
    )
}