'use strict';

const start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  budgetMonthValue = document.getElementsByClassName('result-total')[0],
  budgetDayValue = document.getElementsByClassName('result-total')[1],
  expensesMonthValue = document.getElementsByClassName('result-total')[2],
  expensesTitle = document.querySelector('input.expenses-title'),
  additionalIncomeValue = document.getElementsByClassName('result-total')[3],
  additionalExpensesValue = document.getElementsByClassName('result-total')[4],
  incomePeriodValue = document.getElementsByClassName('result-total')[5],
  targetMonthValue = document.getElementsByClassName('result-total')[6],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  range = document.querySelector('[type="range"]'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  targetAmount = document.querySelector('.target-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItem = document.querySelectorAll('.income-items');
  start.style.pointerEvents = 'none';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
},
isString = function(n) {
  if (n !== null) {
    if(n.trim().length > 0 && !isNumber(n)) {
      for (let i = 0; i < n.length; i++) {
        if (isNumber(n[i])) {
            return false;
        }
      }
      return true;
    }
  }
  return false;
},
toUpp = function(arr) {
  let str = arr.map(function(upper){
    return upper.charAt(0).toUpperCase(arr) + upper.substring(1);
  });
  console.log(str.join(', '));
};

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0, 
  income: {},  
  incomeMonth: 0,
  addIncome: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  addExpenses: [],
  expenses: {},
  expensesMonth: 0,
  start: function() {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function() { 
    budgetDayValue.value = appData.budgetDay;
    budgetMonthValue.value = appData.budgetMonth;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', appData.showResult);
  },
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
      item.value = '';
  });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    appData.validMethod();
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    const cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    appData.validMethod();
    if(incomeItem.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getIncome: function() {
    incomeItem.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome.trim() !== '' && cashIncome.trim() !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if(itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function() {
    if(appData.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    } else if (600 <= appData.budgetDay < 1200) {
      return('У вас средний уровень дохода');
    } else if (0 <= appData.budgetDay < 600) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else{
      return('Что-то пошло не так');
    }
  },
  getExpensesMonth: function() {
    for(let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getInfoDeposit: function() {
  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  },
  validMethod: function() {
    let inputName = document.querySelectorAll('[placeholder="Наименование"]'),
    inputSum = document.querySelectorAll('[placeholder="Сумма"]');
  
    inputName.forEach(function (item) { 
            item.addEventListener('input', function () {
                item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
            });
    });
    
    inputSum.forEach(function (item) {
        item.addEventListener('input', function () {
            if(item.value === '0') {
                item.value = item.value.replace(/[^1-9]/i, '');
            }
            item.value = item.value.replace(/[^0-9]/i, '');
        });
    });
  }
};

appData.validMethod();

salaryAmount.addEventListener('input', function() {
  if (isNumber(salaryAmount.value.trim()) && salaryAmount.value !== '') {
    start.style.pointerEvents = '';
  } else {
    start.style.pointerEvents = 'none';
  }
});
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
  periodAmount.textContent = periodSelect.value;
});









