import input from "analiza-sync";

/* --------- FILE: menu.js --------- */
// מודול ניהול מנות
function createDish(name, price, category) {
  return { name, price, category };
}

function addDish(menu, dish) {
  menu.push(dish);
}

function removeDish(menu, index) {
  menu.splice(index, 1);
}

function showMenu(menu) {
  console.log("\nMenu:");
  if (menu.length === 0) console.log("Menu is empty.");
  else menu.forEach((dish, i) => {
    console.log(`${i}: ${dish.name} - $${dish.price} (${dish.category})`);
  });
}

function sortMenuByPrice(menu) {
  menu.sort((a, b) => a.price - b.price);
}

function sortMenuByName(menu) {
  menu.sort((a, b) => a.name.localeCompare(b.name));
}

function searchByCategory(menu, category) {
  const results = menu.filter(dish => dish.category === category);
  console.log(`\nDishes in category "${category}":`);
  if (results.length === 0) console.log("No dishes found.");
  else results.forEach((dish, i) => {
    console.log(`${i}: ${dish.name} - $${dish.price}`);
  });
}

/* --------- FILE: customer.js --------- */
// מודול ניהול לקוחות
function createCustomer(name) {
  return {
    name,
    orders: []
  };
}

function addOrder(customer, dish) {
  customer.orders.push(dish);
}

function removeOrder(customer, index) {
  customer.orders.splice(index, 1);
}

function showOrders(customer) {
  console.log(`\n${customer.name}'s Orders:`);
  if (customer.orders.length === 0) console.log("No orders yet.");
  else customer.orders.forEach((dish, i) => {
    console.log(`${i}: ${dish.name} - $${dish.price} (${dish.category})`);
  });
}

/* --------- FILE: main.js --------- */
const menu = [];
const customer1 = createCustomer("Alice");
const customer2 = createCustomer("Bob");
let currentCustomer = customer1;

console.log("Welcome to Restaurant Order Manager!");

while (true) {
  console.log("\nOptions:");
  console.log("1 = Add Dish to Menu");
  console.log("2 = Remove Dish from Menu");
  console.log("3 = Show Menu");
  console.log("4 = Sort Menu by Price");
  console.log("5 = Sort Menu by Name");
  console.log("6 = Search by Category");
  console.log("7 = Add Order for Customer");
  console.log("8 = Remove Order for Customer");
  console.log("9 = Show Customer Orders");
  console.log("10 = Switch Customer");
  console.log("11 = Exit");

  const choice = Number(input("Choose an option: "));

  if (choice === 1) {
    const name = input("Dish name: ");
    const price = Number(input("Price: "));
    const category = input("Category: ");
    addDish(menu, createDish(name, price, category));
  } else if (choice === 2) {
    showMenu(menu);
    const index = Number(input("Index to remove: "));
    removeDish(menu, index);
  } else if (choice === 3) {
    showMenu(menu);
  } else if (choice === 4) {
    sortMenuByPrice(menu);
    console.log("Menu sorted by price.");
  } else if (choice === 5) {
    sortMenuByName(menu);
    console.log("Menu sorted by name.");
  } else if (choice === 6) {
    const category = input("Category to search: ");
    searchByCategory(menu, category);
  } else if (choice === 7) {
    showMenu(menu);
    const index = Number(input("Index of dish to order: "));
    if (menu[index]) addOrder(currentCustomer, menu[index]);
  } else if (choice === 8) {
    showOrders(currentCustomer);
    const index = Number(input("Index of order to remove: "));
    removeOrder(currentCustomer, index);
  } else if (choice === 9) {
    showOrders(currentCustomer);
  } else if (choice === 10) {
    currentCustomer = currentCustomer === customer1 ? customer2 : customer1;
    console.log(`Switched to ${currentCustomer.name}`);
  } else if (choice === 11) {
    console.log("Exiting Restaurant Manager.");
    break;
  } else {
    console.log("Invalid option, try again.");
  }
}
