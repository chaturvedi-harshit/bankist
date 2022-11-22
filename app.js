"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function showMovements(account) {
  containerMovements.innerHTML = "";
  account.movements.forEach((movementItem, movIndex) => {
    const movementType = movementItem > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      movIndex + 1
    } ${movementType}</div>
        <div class="movements__value">${movementItem}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// Creating usernames

function createUsernames(accountInfoArray) {
  accountInfoArray.forEach((accountInfoObj) => {
    accountInfoObj.username = accountInfoObj.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}

createUsernames(accounts);

// Calculate and show balance

function calcDisplayCurrentBalance(account) {
  const currentBalance = account.movements.reduce(
    (movementAcc, currentMovement) => {
      return movementAcc + currentMovement;
    },
    0
  );
  labelBalance.textContent = `${currentBalance}€`;
}

// Calculate In and Out Summary

function calcDisplayInOutSummary(account) {
  const incoming = account.movements
    .filter((movement) => movement > 0)
    .reduce((acc, currentValue) => acc + currentValue, 0);

  labelSumIn.textContent = `${incoming}€`;

  const outgoing = account.movements
    .filter((movement) => movement < 0)
    .reduce((acc, currentValue) => acc - -currentValue, 0);

  labelSumOut.textContent = `${outgoing}€`;
}

// Implement login

let currentAccount;

currentAccount = account1;
containerApp.style.opacity = 1;
updateUI(currentAccount);

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (
    currentAccount.username === inputLoginUsername.value &&
    currentAccount.pin === +inputLoginPin.value
  ) {
    console.log("Logged in");

    updateUI(currentAccount);

    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;

    // set opacity to 1 to container app
    containerApp.style.opacity = 1;

    // clear username and pin values
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
  }
  console.log(currentAccount.movements);
});

// Update UI

function updateUI(currenAccount) {
  // Show movements
  showMovements(currentAccount);

  // calc and display current balance
  calcDisplayCurrentBalance(currentAccount);

  // calc and display in and out summary
  calcDisplayInOutSummary(currentAccount);
}

// Implementing Transfer money

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = inputTransferAmount.value;
  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  console.log(receiverAccount);
});
