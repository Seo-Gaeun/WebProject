import React from 'react';

const TotalFilter = ({expenses, selectMonth, selectCategory}) => {       //expenses: 전체 배열, selectMonth: 필터 배열

    //MonthFilter.js와 일치
    const filteredExpenses = selectMonth ?                              
        expenses.filter((expense) => {                                  
            const expenseMonth = new Date(expense.date).getMonth() + 1; 
            return String(expenseMonth) === selectMonth;                
        })                                                              
    : expenses;

    const categoryExpenses = selectCategory ?
        filteredExpenses.filter((expense) => {
            return expense.category === selectCategory;
        })
    : filteredExpenses;

    //reduce: 배열 내 값을 한번씩 호출 (reduce - GPT)
    return (
        <>
            {categoryExpenses.length > 0 ?
                (categoryExpenses.reduce((totalExpenses, expense) => 
                    totalExpenses + expense.amount, 0)
            ):(
                0
            )}
        </>
    );
};

export default TotalFilter;