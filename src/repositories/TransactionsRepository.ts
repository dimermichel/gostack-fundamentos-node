import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((sum, record) => sum + record.value, 0) as number;
    this.balance.outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((sum, record) => sum + record.value, 0) as number;
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const balanceCheck = this.getBalance();
    const hasFunds = type === 'outcome' && balanceCheck.total - value <= 0;

    if (hasFunds) {
      throw Error("You don't have enough funds");
    }

    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
