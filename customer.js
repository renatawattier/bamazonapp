var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

});
connection.query("SELECT * FROM  product", function(err, result){
    console.log(result);
    inquirer.prompt([
        {
            name: "Q1",
            type: "input",
            message: "What is the id of the product do you want to buy?",
        },
        {
            name: "Q2",
            type: "input",
            message: "How many would you like?",

        }
    ]).then(function(answers){
        console.log(answers.Q1)
        for (var i = 0; i < result.length; i++){
           if (result[i].id == answers.Q1) {
            //    console.log(result[i]);
               if (result[i].stock_quantity >= answers.Q2){
                   console.log("there is enough in stock");
                    //subtract from stock and update quantity from mysql
                    var newStockQuantity = result[i].stock_quantity - answers.Q2
                    connection.query ("UPDATE products SET ?  WHERE ?",[{stock_quantity: newStockQuantity},{id: answers.Q1}] , function(err, result){
                        console.log(result)
                    } )

                // console.log("Congratulation your purchase was completed, your total order cost was: " + " ")

               }
               else{
                   console.log("I'm sorry we do not have enough");
               }
            }



        }
    })

})






connection.end();