    var mysql = require("mysql");
    var inquirer = require("inquirer");

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
            connect(ID,quantity);
        });
    }

    function display(){
            
        connection.query("SELECT * FROM products", function(err,results){
            if (err) throw err;
            console.log("Products: \n", results);
        });

    }

    function connect(ID, quantity){
            var test = false;
            var res = 0;
            var price = 0;

            connection.query("SELECT stock_quantity, price FROM products WHERE item_id=?", ID, function(err,results){
                if (err) throw err;
                res = results[0].stock_quantity;
                price = results[0].price;
                console.log("Current Stock:", res);
                if (res<quantity){
                    console.log(`Insufficient quantity!`);
                    test = false;
                } else { 
                    test = true;
                    var newprice = price*quantity;
                    console.log("Price:", newprice);
                }
            })
            var newquantity;
            setTimeout(
            function(){
                newquantity = res-quantity;
                if (test == true){
                    console.log("New stock quantity for item " + ID +" is: " + newquantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newquantity}, {item_id: ID}],  function(err){
                        if (err) throw err;
                    }); 
                    console.log();
                }
                connection.end();
            }, 100); 
    }