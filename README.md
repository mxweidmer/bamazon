# bamazon

## Description
### This is a command line application replicating a basic storefront. When run the application displays a complete table of all the products the store has on offer, with pricing and stock quantities. The application prompts the user to enter the id of a product, as well as how many units they would like to purchase. If the item is in stock in sufficient numbers, the purchase is made and the database updated subtracting the units purchased from the previous amount. The application also tells the user how much a purchase was based on the price stored in the database and the number of units purchased. If there is not enough stock, the user it told "Insufficient Quantity" and they are redirected back to try again. If the user enters q they can exit the application.

## Notes
* External node packages are required. Run npm install in the folder to install all necessary packages

## GIF Demos

Making a purchase |
:------------------:
![Making a purchase](https://github.com/mxweidmer/bamazon/blob/master/images/demo.gif) |


## Important Code Details

Requiring packages and MySQL setup |
:------------------:
![Requiring packages and MySQL setup](https://github.com/mxweidmer/bamazon/blob/master/images/package.JPG) |

Display function |
:------------------:
![Display function](https://github.com/mxweidmer/bamazon/blob/master/images/display.JPG) |

Main function (inquirer prompts) |
:------------------:
![Main function (inquirer prompts)](https://github.com/mxweidmer/bamazon/blob/master/images/main.JPG) |

Make purchase function |
:------------------:
![Make purchase function](https://github.com/mxweidmer/bamazon/blob/master/images/purch.JPG) |

Contributors |
:-------:
* Max Weidmer

Technologies Used |
:---------:
* Javascript
* Node.js
* Inquirer
* cli-table3
* MySQL