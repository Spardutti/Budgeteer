export interface WeeklyCategoryInterface {
    name: string;
    ammount: number;
    week: number;
    month: number;
    year: number;
}

export interface UserInterface {
    name: string;
}

export interface IncomeInterface {
    id: number;
    amount: number;
    userId: number;
}

export interface WeeklyExpenseInterface {
    userId?: number;
    familyId?: number;
    categoryId: number;
    amount: number;
}
