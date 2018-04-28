DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price VARCHAR(45) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggo", "food", 2.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "furniture", 399, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table", "furniture", 149, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken", "food", 4.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "clothes", 9.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flip-flops", "clothes", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mango", "food", 0.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bookshelf", "furniture", 99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shorts", "clothes", 9.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "food", 2.99, 50);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
