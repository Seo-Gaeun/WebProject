import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (!date || !title || !amount || !category || category == '분류') {
            alert('모든 필드를 입력하세요.');
            return;
        }

        const newExpense = { date, title, amount: parseFloat(amount), category };
        addExpense(newExpense);
        setDate('');
        setTitle('');
        setAmount('');
        setCategory('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <fieldset style={{display: 'inline-block'}}>
                    <legend style={{textAlign: 'center'}}><h2>Add Expense</h2></legend>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder='사용처' 
                    />
                    <br/>
                    <input 
                        type='number' 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder='금액' 
                    />
                    <br/>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                            <option value="분류">분류</option>
                            <option value="식비">식비</option>
                            <option value="통신비">통신비</option>
                            <option value="의료비">의료비</option>
                            <option value="취미생활">취미생활</option>
                            <option value="보험료">보험료</option>
                    </select>
                    <button type='submit' style={{ fontSize: 15 }}>
                        Add Expense
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default ExpenseForm;
