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

display();
ask();
// setTimeout(function(){ask(), 30000}); 

function ask(){
    inquirer.prompt([
        {
        name: "ID",
        message: "What is the ID of the product you wish to purchase?"
        }, {
        name: "quantity",
        message: "How many would you like?"
        },
    ]).then(function(answers) {
        var ID = answers.ID;
        var quantity = answers.quantity;
        // console.log(ID);
        // console.log(quantity);
        numberofproducts().then(function(res){
            if (ID >= 0 && ID<res){
                connect(ID, quantity).then(function(result){
                    console.log(result);
                    update(result, quantity);
                });
            } else {
                console.log("Product not found");
                promise.database.close();
            }
        });

        // if (ID >= 0){
        //     connect(ID, quantity).then(function(result){
        //         console.log(result);
        //         update(result, quantity);
        //     });
        // } else {console.log("Product not found");}
        
    });
}

function display(){
    promise.database.query( 'SELECT * FROM products' ).then( result => {
        console.log(result);
    } );
    promise.database.close();
}

let numberofproducts = function(){
    return promise.database.query( "SELECT COUNT(*) FROM products").then( results => {
        // var test = 'COUNT(*)';
        // console.log(results.COUNT(*));
        console.log();
        return Object.values(results[0]);
    })
};
    
let connect = function(ID, quantity){
    return promise.database.query( "SELECT stock_quantity, price FROM products WHERE item_id=?", ID).then( results => {
        // if (err) throw err;
        var res = results[0].stock_quantity;
        var price = results[0].price;
        console.log("Current Stock:", res);
        if (res<quantity){
            console.log(`Insufficient quantity!`);
            var test = false;
        } else { 
            var test = true;
            var newprice = price*quantity;
            console.log("Price:", newprice);
        }
        return [test, res, ID];
    });
}

function update(product, quantity){
    var update = product[0];
    var res = product[1];
    var ID = product[2];

    var newquantity = res-quantity;
    console.log("Update?", update);
    console.log("New stock quantity for item " + ID +" is: " + newquantity);
        if (update == true){
            promise.database.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newquantity}, {item_id: ID}]).then( results => {
            });
        }
        promise.database.close();
}