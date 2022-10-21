export interface WeeklyCategoryInterface {
    id: number;
    name: string;
    ammount: number;
    week: number;
    month: number;
    year: number;
    userId: number;
}

export interface UserInterface {
    id: number;
    name: string;
}

export interface IncomeInterface {
    id: number;
    amount: number;
    userId: number;
    year: number;
    month: number;
}

export interface WeeklyExpenseInterface {
    id: number;
    userId: number;
    weeklyCategoryId: number;
    amount: number;
}
