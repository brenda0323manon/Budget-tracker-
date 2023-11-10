class BudgetTracker {
    constructor() {
      this.transactions = [];
      this.formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        gsignDisplay: 'always',
        minimumFractionDigits: 2,
      });
  
      this.list = document.getElementById("transactionList");
      this.form = document.getElementById("transactionForm");
      this.status = document.getElementById("status");
      this.balance = document.getElementById("balance");
      this.income = document.getElementById("income");
      this.expense = document.getElementById("expense");
  
      this.form.addEventListener('submit', this.addTransaction.bind(this));
  
      this.renderList();
      this.updateTotal();
    }
  
    updateTotal() {
      const incomeTotal = this.transactions
        .filter(trx => trx.type === 'income')
        .reduce((total, trx) => total + trx.amount, 0);
  
      const expenseTotal = this.transactions
        .filter(trx => trx.type === 'expense')
        .reduce((total, trx) => total + trx.amount, 0);
  
      const balanceTotal = incomeTotal - expenseTotal;
  
      this.balance.textContent = this.formatter.format(balanceTotal).substring(1);
      this.expense.textContent = this.formatter.format(expenseTotal * -1);
      this.income.textContent = this.formatter.format(incomeTotal);
    }
  
    renderList() {
      this.list.innerHTML = "";
  
      if (this.transactions.length === 0) {
        this.status.textContent = 'No transactions.';
        return;
      } else {
        this.status.textContent = "";
      }
  
      this.transactions.forEach(({ id, name, amount, type }) => {
        const sign = type === 'income' ? 1 : -1;
  
        const li = document.createElement('li');
        
        li.innerHTML = `
           <div class="name">
              <h4>${name}</h4>
           </div>
  
           <div class="amount ${type}">
               <span>${this.formatter.format(amount * sign)}</span>
           </div>
        
           <div class="action">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
           stroke="currentColor" 
           onclick="deleteTransaction(${id})">
           <path stroke-linecap="round" stroke-linejoin="round" 
           d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           </div>
        `;
  
        this.list.appendChild(li);
      });
    }
    //delets transactions from the list 
    deleteTransaction(id) {
      const index = this.transactions.findIndex((trx) => trx.id === id);
      this.transactions.splice(index, 1);
  
      this.updateTotal();
      this.renderList();
    }
   ///Adds transactions to the transaction list
    addTransaction(e) {
      e.preventDefault();
  
      const formData = new FormData(this.form);
     
      this.transactions.push({ ///pushes everything from the input to the 
        id: this.transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        type: 'on' === formData.get("type") ? "income" : "expense",
      });
  
      this.form.reset();
      this.updateTotal();
      this.renderList();
    }
  }
  
  // Instantiate the BudgetTracker class
  const budgetTracker = new BudgetTracker();
  


 
