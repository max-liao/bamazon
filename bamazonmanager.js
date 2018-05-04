    var mysql = require("mysql");
    var inquirer = require("inquirer");
    var promise = require("./promise.js");

    var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
    });

    ask();

    function ask(){
        inquirer.prompt([
            {
            name: "command",
            message: "Which manager task would you like to accomplish\n(1) View Products for Sale. \n(2) View Low Inventory. \n(3) Add to Inventory. \n(4) Add Product\n"
            },
        ]).then(function(answers) {
            var cmd = answers.command;
            // var quantity = answers.quantity;
            switch (cmd){
                case "1":
                console.log("View Products for Sale");
                display();
                break;
                case "2":
                console.log("View Low Inventory");
                lowinventory();
                break;
                case "3":
                console.log("Add to Inventory");
                addinventory();
                break;
                case "4":
                console.log("Add Product");
                addproduct();
                break;
                default:
                console.log("Please input an option (1-4)");
                promise.database.close();
                break;
            }
        });
    }

function display(){
    promise.database.query( 'SELECT * FROM products' ).then( result => {
        console.log(result);
    } );
    promise.database.close();
}


function lowinventory(){
    promise.database.query( 'SELECT item_id, stock_quantity, product_name FROM products' ).then( results => {
        console.log("The following products have stock quantity < 5");
        for (i=0; i<results.length; i++){
            if (results[i].stock_quantity < 5){
                console.log("Item id: %s Name: %s Stock Quantity: %s\n", results[i].item_id, results[i].product_name, results[i].stock_quantity);
            }
        }
    });
    promise.database.close();
}

function addinventory(){
    inquirer.prompt([
        {
        name: "ID",
        message: "What is the ID of the product you wish to add stock for?"
        }, {
        name: "quantity",
        message: "How many would you like to add?"
        },
    ]).then(function(answers) {
        var ID = answers.ID;
        var addstock = answers.quantity;

        stockcheck(ID).then(function(result){
            console.log("Stock:", result);
            var newquantity = parseInt(result) + parseInt(addstock);
            console.log("New Stock:", newquantity);
            promise.database.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newquantity}, {item_id: ID}]).then( results => {
                // console.log(results);
            });
        });
});
promise.database.close();
}

let stockcheck = function(ID){
    return promise.database.query( "SELECT stock_quantity, price FROM products WHERE item_id=?", ID).then( results => {
        // if (err) throw err;
        var stock = results[0].stock_quantity;
        return stock;
    });
}


function addinventory(){
    inquirer.prompt([
        {
        name: "ID",
        message: "What is the ID of the product you wish to add stock for?"
        }, {
        name: "quantity",
        message: "How many would you like to add?"
        },
    ]).then(function(answers) {
        var ID = answers.ID;
        var addstock = answers.quantity;

        stockcheck(ID).then(function(result){
            console.log("Stock:", result);
            var newquantity = parseInt(result) + parseInt(addstock);
            console.log("New Stock:", newquantity);
            promise.database.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newquantity}, {item_id: ID}]).then( results => {
                // console.log(results);
            });
        });
});
promise.database.close();
}


function addproduct(){
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the product you wish to add?"
        }, {
            name: "department",
            message: "What is the department for this product?"
        },{
            name: "price",
            message: "What is the price for this product?"
        },{
            name: "stock",
            message: "What is the stock quantity for this product?"
        },
    ]).then(function(answers) {
        var name = answers.name;
        var department = answers.department;
        var price = answers.price;
        var stock = answers.stock;
    
        promise.database.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [name, department, price, stockcheck]).then( results => {
            console.log(results);
        });
    });

promise.database.close();
}
