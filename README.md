[![Build Status](https://travis-ci.org/otaigbe/store-manager.svg?branch=develop)](https://travis-ci.org/otaigbe/store-manager)  [![Coverage Status](https://coveralls.io/repos/github/otaigbe/store-manager/badge.svg?branch=develop)](https://coveralls.io/github/otaigbe/store-manager?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/100b2a4e64fc7695355c/test_coverage)](https://codeclimate.com/github/otaigbe/store-manager/test_coverage)

# Store-Manager
Store-Manager is a light weight, easy to use desktop application that runs primarily in a browser. It is built on top of NodeJS and uses javascript to query restful resources from the backend. It is higly responsive and flexible because it helps the store owner/Administrator perform a variety of operations which include:
* Searching and adding products to buyer’s cart.
* Printing receipts and automates the generation of sales records. 
* Viewing available products and all relevant product details.
* Viewing all sales records and filtering them using criteria such as Receipt number,Date, sales record id.
* Adding, modifying and deleting products.
* Giving Admin rights to any store attendant he pleases.

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
* input this email and password in this format {  "name":"Ehimare", "email":"Ehimare@gmail.com", "password":"password",  "admin":"true" }
* click send
* The User which was just created has admin privileges and can perform admin level acitivites after the user is logged in. To login in follow the steps in the login section.


# Using the  GUI



# Running tests
* If all the dependencies installed correctly just run 'npm run test' to run the tests

# Author
Otaigbe Okhueleigbe

# Acknowledgements


