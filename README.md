[![Build Status](https://travis-ci.org/otaigbe/store-manager.svg?branch=develop)](https://travis-ci.org/otaigbe/store-manager)  [![Coverage Status](https://coveralls.io/repos/github/otaigbe/store-manager/badge.svg?branch=develop)](https://coveralls.io/github/otaigbe/store-manager?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/100b2a4e64fc7695355c/maintainability)](https://codeclimate.com/github/otaigbe/store-manager/maintainability)

# Store-Manager
Store-Manager is a light weight, easy to use desktop application that runs primarily in a browser. It is built on top of NodeJS and uses javascript to query restful resources from the backend. It is higly responsive and flexible because it helps the store owner/Administrator perform a variety of operations which include:
* Searching and adding products to buyer’s cart.
* Printing receipts and automates the generation of sales records. 
* Viewing available products and all relevant product details.
* Viewing all sales records and filtering them using criteria such as Receipt number,Date, sales record id.
* Adding, modifying and deleting products.
* Giving Admin rights to any store attendant he pleases.

# Project Management
This project is managed using the pivotal tracker Management tool. click [here](https://www.pivotaltracker.com/n/projects/2203108) to inspect.
# Documentation
[Api Documentation](https://app.swaggerhub.com/apis-docs/otaigbe/Store-Manager/1.0)

# Getting Started
To obtain a copy of this app download or clone the repository. Once you download the zip file, extract zip archive file to a directory any where on your computer.

# Prerequisites
You must have 
* NodeJs Installed
* A browser or a RESTAPI client(like POSTMAN)
* An Internet connection to download the dependencies.

# Installing
* In the command prompt, cd to the root of the directory you extracted the app into
* Run 'npm install' to install all dependencies
* Run 'node index.js' to start the application
* In a browser you navigate to 'http://localhost:5500/login.html'

# Using The App In Postman Locally
### First step is to login
* Input this url= http://localhost:5500/api/v1/auth/login in the address bar.
* Select the 'Post' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Choose the raw checkbox in the body section
* input this email and password in this format { "email":"otaigbe@gmail.com", "password": "password" } 
* click send
* Check the response header for the 'x-auth-token' take note of it. It would be needed later.
### Next step is to signup a new store attendant
* Input this url= http://localhost:5500/api/v1/auth/signup in the address bar.
* Select the 'Post' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* Choose the raw checkbox in the body section
* input attendant info in this format {
          name: 'tunde',
          lastname: 'tunde',
          phoneNumber: 234088543888,
          email: 'tunde@gmail.com',
          password: 'password',
          admin: true,
        }
* click send
* The User which was just created has admin privileges and can perform admin level acitivites after the user is logged in. To login in follow the steps in the login section.

### Perform other admin level activities.
#### Creating product
* Input this url= http://localhost:5500/api/v1/products in the address bar.
* Select the 'Post' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* Choose the raw checkbox in the body section
* input product info in this format 
{product_desc: 'short bread butter biscuit',
 unit_price: 650,
 quantity_in_stock: 40,
 quantity_supplied: 40,
 supplier_name: 'Okonkwo',
 category: 'biscuits',
 }
* click send
* Response should be "Created a new product.".
#### Getting all products
* Input this url= http://localhost:5500/api/v1/products in the address bar.
* Select the 'GET' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* click send
* Response should be all products in the database.
#### Getting a single product by ID
* Input this url= http://localhost:5500/api/v1/products/5 in the address bar.
* Select the 'GET' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* click send
* Response should be a single product from the database.
#### Modifying a product with ID of 7
* Input this url= http://localhost:5500/api/v1/products/7 in the address bar.
* Select the 'PUT' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* Choose the raw checkbox in the body section
* input product info in this format 
{
          product_id: 7,
          product_desc: 'Ariel',
          unit_price: 400,
          quantity_in_stock: 150,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'Detergent',
 }
* click send
* Response should be "{ message: 'Product Modified' }".
#### Deleting a product with ID of 7
* Input this url= http://localhost:5500/api/v1/products/7 in the address bar.
* Select the 'DELETE' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* Choose the raw checkbox in the body section
* click send
* Response should be "Product Deleted".
#### Getting all sale records
* Input this url= http://localhost:5500/api/v1/sales in the address bar.
* Select the 'GET' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* click send
* Response should be all salerecords in the database.
#### Getting a single salerecord by ID
* Input this url= http://localhost:5500/api/v1/sales/5 in the address bar.
* Select the 'GET' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* click send
* Response should be a single sales records from the database.
#### Creating product
* Input this url= http://localhost:5500/api/v1/sales in the address bar.
* Select the 'Post' HTTP method.
* Set the request header 'Content-Type' to 'application/json'.
* Set the request header 'x-auth-token' to the token obtained from login.
* Choose the raw checkbox in the body section
* input sales info in this format 
{
          salesRecords: [{
            product_id: 6,
            product_desc: 'Biscuits',
            unit_price: 400,
            quantity_bought: 5,
            amount: 2000,
          }],
          attendant_name: 'otaigbe',
          receiptNumber: 598796898709,
        }
* click send
* Response should be "{ message: 'Records saved' }".

# Running tests
* If all the dependencies installed correctly just run 'npm run test' to run the tests

# Author
Otaigbe Okhueleigbe


