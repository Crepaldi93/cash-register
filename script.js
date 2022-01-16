function checkCashRegister(price, cash, cid) {

  // Create an object with all currency units and their values:
  
  const units = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }

  // Create a changeDue variable, which calculates the value in change that has to be returned:
  
  let changeDue = cash - price;
  
  // Create a "change" variable, which is initially set to an aempty array and will contain the change given:
  
  let change = [];
  
  // Loop through "cid" array, calculation the change of each currency unit, adding each currency unit and its value to the "change" array and subtracting the value added from the "changeDue" variable:
  
  for (let i = cid.length - 1; i >= 0; i--) {
    if (changeDue >= units[cid[i][0]] && cid[i][1] > 0) {
      let value = Math.floor(changeDue / units[cid[i][0]]) * units[cid[i][0]]
      
      
      if (value < cid[i][1]) {
        change.push([cid[i][0], value]);
        changeDue = (changeDue - value).toFixed(2)
      } else {
        change.push([cid[i][0], cid[i][1]]);
        changeDue = (changeDue - cid[i][1]).toFixed(2)
      }
    }
  }
  
  // Create a "status" variable, which can be set to "INSUFFICIENT_FUNDS", "OPEN" or "CLOSED":
  
  let status;
  
  // Create a variable "valueInDrawer" with the total amount of money in the cid:
  
  let valueInDrawer = cid.reduce((a, b) => a + b[1], 0).toFixed(2);
  
  // Set the possible values of "status" and "change", depending on the case:
  
  if (changeDue > 0) {
    change = [];
    status = "INSUFFICIENT_FUNDS";
  } else if ( valueInDrawer == cash - price) {
    status = "CLOSED";
    change = cid
  } else {
    status = "OPEN";
  }
  
  return {status: status, change: change};
}


// Tests: 

// Return {status: "OPEN", change: [["QUARTER", 0.5]]}
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// Return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// Return {status: "INSUFFICIENT_FUNDS", change: []}
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// Return {status: "INSUFFICIENT_FUNDS", change: []}
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);


// Return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

