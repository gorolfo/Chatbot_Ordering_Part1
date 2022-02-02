const { mutateExecOptions } = require("nodemon/lib/config/load");
const Order = require("./Order");

const pizzaOrder_price = 7.5;
const burgerOrder_price = 1.5;
const sandwichOrder_price = 3;
const small_price = 1.3;
const medium_price = 2.4;
const large_price = 3.5;
const toppings_price = 4.5;
const drinks_price = 2.5;
const fries_price = 3.5;
const nuggets_price = 4;
// ON tax
const tax = 0.13; 


const OrderState = Object.freeze({
    WELCOMING:          Symbol("welcoming"),
    MENU:               Symbol("menu"),
    SIZE:               Symbol("size"),
    TOPPINGS_PIZZA:     Symbol("toppings"),
    TOPPINGS_BURGER:    Symbol("toppings"),
    TOPPINGS_SANDWICH:  Symbol("toppings"),
    OPTIONAL_DRINK:     Symbol("optionaldrinks"),
    CONFIRMATION_DRINK: Symbol("optionaldrinks"),
    SELECTED_DRINK:     Symbol("selecteddrinks"),
    UPSELL_ITEMS:       Symbol("upsell"),
    UPSELL_CHOICE:      Symbol("upsell_choice"),
    CONFIRMATION:       Symbol("confirmation"),
    RECEIPT:            Symbol("receipt"),
    ADDITIONAL_ORDER:   Symbol("receipt"),
    CHECKOUT:           Symbol("checkout")
});

module.exports = class FastFoodOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sMenu = "";
        this.sItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sUpsell = "";
        this.sOrders = "";
        this.sPrice = 0;
        this.sTax = 0;
        this.sTotalAmount = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            // Welcoming message 
            case OrderState.WELCOMING:
                aReturn.push("==============================\n *Welcome to Glenn's Restaurant*\n *The finest restaurant in town...*\n ==============================");
            case OrderState.MENU:
                this.stateCur = OrderState.SIZE;
                aReturn.push("What would you like to order? \n Available Menu: \n 1. Pizza @ $7.5\n 2. Burger @ 1.5\n 3. Sandwich @ $3");
                break;

            // Choose items from the menu
            case OrderState.SIZE:
                this.sItem = sInput;
                // check the order item and save the price
                if (this.sItem.toLowerCase() == "pizza") {
                    this.stateCur = OrderState.TOPPINGS_PIZZA;
                    this.sPrice += pizzaOrder_price;
                } 
                else if (this.sItem.toLowerCase() == "burger") {
                    this.stateCur = OrderState.TOPPINGS_BURGER;
                    this.sPrice += burgerOrder_price;
                } 
                else if (this.sItem.toLowerCase() == "sandwich") {
                    this.stateCur = OrderState.TOPPINGS_SANDWICH;
                    this.sPrice += sandwichOrder_price;
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed your order request for ${this.sItem.bold()}.`);
                    aReturn.push("Please choose from the available menu only \n Pizza, \n Burger, \n or Sandwich only.");
                    this.stateCur = OrderState.SIZE;
                    break;
                }
                aReturn.push("What size would you like? \n small @ $1.3\n medium @ $2.4\n or large @ $3.5");
                break;

            // Choose toppings for pizza
            case OrderState.TOPPINGS_PIZZA:
                this.sSize = sInput;
                this.stateCur = OrderState.OPTIONAL_DRINK
                // Check the item size selected and and the price 
                if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") {
                    if (this.sSize.toLowerCase() == "small") {
                        this.sPrice += small_price;
                    } 
                    else if (this.sSize.toLowerCase() == "medium") {
                        this.sPrice += medium_price;
                    } 
                    else if (this.sSize.toLowerCase() == "large") {
                        this.sPrice += large_price;
                    }
                    aReturn.push("What pizza toppings would you like to add @ $4.5?") &&
                    aReturn.push("1. Pepperoni, \n 2. Supreme, \n 3. Hawaiian or \n 4. BBQ only");
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed your request for ${this.sSize.bold()} size.`) &&
                    aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
                    this.stateCur = OrderState.TOPPINGS_PIZZA;
                    break;
                }
                break;

            // Choose toppings for burger
            case OrderState.TOPPINGS_BURGER:
                this.sSize = sInput;
                this.stateCur = OrderState.OPTIONAL_DRINK
                // Check the item size selected and and the price 
                if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") {
                    if (this.sSize.toLowerCase() == "small") {
                        this.sPrice += small_price;
                    } 
                    else if (this.sSize.toLowerCase() == "medium") {
                        this.sPrice += medium_price;
                    } 
                    else if (this.sSize.toLowerCase() == "large") {
                        this.sPrice += large_price;
                    }
                    aReturn.push("What burger toppings would you like to add @ $4.5?") &&
                    aReturn.push("1. Bacon \n 2. Barbeque \n 3. Cheese or \n 4. Steak");
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed your request for size ${this.sSize.bold()}.`) &&
                    aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
                    this.stateCur = OrderState.TOPPINGS_BURGER;
                    break;
                }
                break;

            // Choose toppings for sandwich
            case OrderState.TOPPINGS_SANDWICH:
                this.sSize = sInput;
                this.stateCur = OrderState.OPTIONAL_DRINK
                // Check the item size selected and and the price 
                if (this.sSize.toLowerCase() == "small" || this.sSize.toLowerCase() == "medium" || this.sSize.toLowerCase() == "large") {
                    if (this.sSize.toLowerCase() == "small") {
                        this.sPrice += small_price;
                    } 
                    else if (this.sSize.toLowerCase() == "medium") {
                        this.sPrice += medium_price;
                    } 
                    else if (this.sSize.toLowerCase() == "large") {
                        this.sPrice += large_price;
                    }
                    aReturn.push("What sandwich fillings would you like to add @ $4.5?") &&
                    aReturn.push("1. Cheese \n 2. Ham \n 3. Sausage or \n 4. Egg");
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed your request for size ${this.sSize.bold()}.`) &&
                    aReturn.push("Please choose from the available size between \n Small, \n Medium, \n or Large only.");
                    this.stateCur = OrderState.TOPPINGS_SANDWICH;
                    break;
                }
                break;

            // Optional drinks
            case OrderState.OPTIONAL_DRINK:
                this.sToppings = sInput;
                this.stateCur = OrderState.SELECTED_DRINK
                // Check for selected toppings/fillings
                // Pizza toppings
                if (this.sToppings.toLowerCase() == "pepperoni" || this.sToppings.toLowerCase() == "supreme" || this.sToppings.toLowerCase() == "hawaiian" || this.sToppings.toLowerCase() == "bbq") {
                    this.sPrice += toppings_price; 
                } 
                // Burger toppings
                else if (this.sToppings.toLowerCase() == "bacon" || this.sToppings.toLowerCase() == "barbeque" || this.sToppings.toLowerCase() == "cheese" || this.sToppings.toLowerCase() == "steak") {
                    this.sPrice += toppings_price;  
                } 
                // Sandwich fillings
                else if (this.sToppings.toLowerCase() == "cheese" || this.sToppings.toLowerCase() == "ham" || this.sToppings.toLowerCase() == "sausage" || this.sToppings.toLowerCase() == "egg") {
                    this.sPrice += toppings_price;  
                }
                else {
                    this.stateCur = OrderState.OPTIONAL_DRINK;
                    aReturn.push(`Sorry! We are unable to processed your ${this.sToppings.bold()} toppings/fillings request.`) &&
                    aReturn.push("Please choose from the available toppings/fillings only.");
                    if (this.sItem.toLowerCase() == "pizza") {
                        aReturn.push("For Pizza toppings: \n 1. Pepperoni, \n 2. Supreme, \n 3. Hawaiian or \n 4. BBQ only");
                        break;
                    }
                    else if (this.sItem.toLowerCase() == "burger") {
                        aReturn.push("For Burger toppings: \n 1. Bacon \n 2. Barbeque \n 3. Cheese or \n 4. Steak");
                        break;
                    }
                    else if (this.sItem.toLowerCase() == "sandwich") {
                        aReturn.push("For Sandwich fillings: \n 1. Cheese \n 2. Ham \n 3. Sausage or \n 4. Egg");
                        break;
                    }
                    break;
                }
                aReturn.push("Would you like to have a drinks or beverages @ $2.5?");
                break; 

            // Selected choice of drinks
            case OrderState.SELECTED_DRINK:
                this.sOptional_Drink = sInput;
                switch(this.sOptional_Drink.toLowerCase()){
                    case 'yes':
                        aReturn.push("Drinks available: \n 1. Coke \n 2. Sprite \n 3. Pineapple \n 4. Tea or \n 5. Coffee only.");
                        this.stateCur = OrderState.UPSELL_ITEMS
                        break;
                    case 'no':
                        aReturn.push("Are you sure you don't want to add any drinks?");
                        this.stateCur = OrderState.CONFIRMATION_DRINK
                        break;
                    default:    
                        aReturn.push(`Sorry! We are unable to processed your ${this.sOptional_Drink.bold()} order confirmation.`);
                        aReturn.push("Is that a 'Yes' or 'No'?");
                        this.stateCur = OrderState.SELECTED_DRINK
                        break;
                }
                break;

            case OrderState.CONFIRMATION_DRINK:
                this.sConfirmation_Drink = sInput;
                this.stateCur = OrderState.UPSELL_ITEMS
                switch(this.sConfirmation_Drink.toLowerCase()) {
                    case 'yes': 
                        this.sDrinks = "without any drinks/beverages,";
                        aReturn.push("Would you like to add some Medium Fries @ $3.5 or 6pcs Chicken Nuggets @ $4?");
                        this.stateCur = OrderState.UPSELL_CHOICE
                        break;
                    case 'no':
                        aReturn.push("Would you like to have a drinks or beverages @ $2.5 instead?");
                        this.stateCur = OrderState.SELECTED_DRINK
                        break;
                    default:    
                        aReturn.push(`Sorry! We are unable to processed your ${this.sConfirmation_Drink.bold()} order confirmation.`);
                        aReturn.push("Is that a 'Yes' or 'No'?");
                        this.stateCur = OrderState.CONFIRMATION_DRINK
                        break;
                }
                break;

            // Up selling other items
            case OrderState.UPSELL_ITEMS:
                this.sSelected_Drink = sInput;                
                this.stateCur = OrderState.UPSELL_CHOICE
                if (this.sSelected_Drink.toLowerCase() == "coke" || this.sSelected_Drink.toLowerCase() == "sprite" || this.sSelected_Drink.toLowerCase() == "pineapple" || this.sSelected_Drink.toLowerCase() == "tea" || this.sSelected_Drink.toLowerCase() == "coffee") {
                    if (this.sSelected_Drink.toLowerCase() == "coke") {
                        this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
                        this.sPrice += drinks_price;
                    }
                    else if (this.sSelected_Drink.toLowerCase() == "sprite") {
                        this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
                        this.sPrice += drinks_price;
                    }
                    else if (this.sSelected_Drink.toLowerCase() == "pineapple") {
                        this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
                        this.sPrice += drinks_price;
                    }
                    else if (this.sSelected_Drink.toLowerCase() == "tea") {
                        this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
                        this.sPrice += drinks_price;
                    }
                    else if (this.sSelected_Drink.toLowerCase() == "coffee") {
                        this.sDrinks = `and a drink of ${this.sSelected_Drink}`;
                        this.sPrice += drinks_price;
                    }
                    else {
                        this.sDrinks = "without any drinks/beverages,";
                    }
                } 
                else {
                    aReturn.push(`Sorry! We are unable to processed your selected ${this.sSelected_Drink.bold()} drinks/beverages.`);
                    aReturn.push("Please choose from the available drinks/beverages: Coke, \n Sprite, \n Pineapple, \n Tea, or \n or Coffee only.");
                    this.stateCur = OrderState.UPSELL_ITEMS
                    break;
                }
                aReturn.push("Would you like to add some Medium Fries @ $3.5 or 6pcs Chicken Nuggets @ $4?");
                break;

            // Up selling options
            case OrderState.UPSELL_CHOICE:
                this.sUpsell_Items = sInput;
                if (this.sUpsell_Items.toLowerCase() == "yes" || this.sUpsell_Items.toLowerCase() == "no") {
                    if (this.sUpsell_Items.toLowerCase() == "yes") {
                        this.stateCur = OrderState.CONFIRMATION
                        aReturn.push("Which item would you like to add Fries or Nuggets?");
                        break;
                    }
                    else if (this.sUpsell_Items.toLowerCase() == "no") {
                        this.stateCur = OrderState.RECEIPT
                        aReturn.push("Do you want to add another order?");
                        this.sUpsell = "without any additional fries or nuggets";
                        break;
                    }
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed ${this.sUpsell_Items.bold()} order confirmation.`);
                    aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
                    this.stateCur = OrderState.UPSELL_CHOICE
                    break;
                }
                break;

            // Order confirmation    
            case OrderState.CONFIRMATION:
                this.sUpsell_Choice = sInput;
                this.stateCur = OrderState.RECEIPT
                if (this.sUpsell_Choice.toLowerCase() == "fries") {
                    this.sUpsell = `with an additional item of medium size ${this.sUpsell_Choice}`;
                    this.sPrice += fries_price;
                }
                else if (this.sUpsell_Choice.toLowerCase() == "nuggets") {
                    this.sUpsell = `with an additional item of 6pcs ${this.sUpsell_Choice}`;
                    this.sPrice += nuggets_price;
                }
                else {
                    aReturn.push(`Sorry! We are unable to processed your additional ${this.sUpsell_Choice.bold()} request.`);
                    aReturn.push("Please enter your selection with a 'Fries' or 'Nuggets'.");
                    this.stateCur = OrderState.CONFIRMATION
                    break;
                }
                aReturn.push("Do you want to add another order?");
            break;

            // Receipt    
            case OrderState.RECEIPT:
                this.sConfirmation = sInput;
                switch(this.sConfirmation.toLowerCase()) {
                    case 'yes': 
                        this.stateCur = OrderState.ADDITIONAL_ORDER
                        aReturn.push("Are you sure you want to add another order?");
                        break;
                    case 'no':
                        this.stateCur = OrderState.CHECKOUT
                        aReturn.push("Thank you for your order of ");
                        aReturn.push(this.sOrders)
                        aReturn.push(`${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell}`);
                        aReturn.push("Do you wish to proceed to checkout?");
                        break;
                    default:
                        aReturn.push(`Sorry! We are unable to processed your ${this.sConfirmation.bold()} order confirmation.`);
                        aReturn.push("Please enter your selection with a 'Yes' or 'No'.");
                        this.stateCur = OrderState.RECEIPT
                        break;
                }
                break;

            // Additional order confirmation    
            case OrderState.ADDITIONAL_ORDER:
                this.sAdditional_Order = sInput;
                switch(this.sAdditional_Order.toLowerCase()) {
                    case 'yes': 
                        this.stateCur = OrderState.SIZE
                        aReturn.push("What would you like to order? \n Available Menu: \n 1. Pizza @ $7.5\n 2. Burger @ 1.5\n 3. Sandwich @ $3");
                        this.sOrders = `${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell}`;
                        break;
                    case 'no': 
                        this.stateCur = OrderState.CHECKOUT
                        aReturn.push("Thank you for your order of ");
                        aReturn.push(this.sOrders)
                        aReturn.push(`${this.sSize} ${this.sItem} with toppings/fillings of ${this.sToppings} ${this.sDrinks} ${this.sUpsell}`);
                        aReturn.push("Do you wish to proceed to checkout?");
                        break;
                }
                break;

            // Checkout  
            case OrderState.CHECKOUT:
                this.sReceipt = sInput;    
                this.isDone(true);   
                switch(this.sReceipt.toLowerCase()) {
                    case 'yes': 
                        this.sTax = this.sPrice * tax;
                        this.sTotalAmount = this.sPrice + this.sTax;
                        aReturn.push(`The total amount of your order is $${this.sTotalAmount.toFixed(2)}.`);

                        let d = new Date(); 
                        d.setMinutes(d.getMinutes() + 20);
                        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                        break;
                    case 'no':
                        aReturn.push("Do you want to add another order?");
                        this.stateCur = OrderState.ADDITIONAL_ORDER
                        break;
                }
                break;
        }
        return aReturn;
    }
}




