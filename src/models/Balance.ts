class Balance {
  income: number;

  outcome: number;

  total: number;

  constructor({ income, outcome, total }: Balance) {
    this.income = income || 0;
    this.outcome = outcome || 0;
    this.total = total || 0;
  }
}

export default Balance;
