import React, { useState, useEffect } from 'react';

const ExpenseUpdate = ({ editingExpense, setEditingExpense, updateExpense}) => {

  const [updatedExpense, setupdatedExpense] = useState(editingExpense);

  useEffect(() => {
    setupdatedExpense(editingExpense);
  }, [editingExpense]);
   
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingExpense.date || !editingExpense.title || !editingExpense.amount || !editingExpense.category || editingExpense.category == '분류') {
        alert('모든 필드를 입력하세요.');}
    else updateExpense(updatedExpense);
  }
    return (                    // MonthFilter 재사용
        <div>
            {editingExpense && (
                <form onSubmit={handleUpdate}>
                <fieldset style={{display: 'inline-block'}}>
                    <legend style={{textAlign: 'center'}}><h2>Edit Expense</h2></legend>
                    <input
                        type='date'
                        value={editingExpense.date}
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, date: e.target.value})
                        } 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={editingExpense.title} 
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, title: e.target.value})
                        } 
                        placeholder='사용처' 
                    />
                    <br/>
                    <input 
                        type='number' 
                        value={editingExpense.amount} 
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, amount: parseFloat(e.target.value)})
                        } 
                        placeholder='금액' 
                    />
                    <br/>
                    <select
                        value={editingExpense.category}
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, category: e.target.value})
                        }>
                            <option value="분류">분류</option>
                            <option value="식비">식비</option>
                            <option value="통신비">통신비</option>
                            <option value="의료비">의료비</option>
                            <option value="취미생활">취미생활</option>
                            <option value="보험료">보험료</option>
                    </select>
                    <button type='submit' style={{ fontSize: 15 }}>
                        Update
                    </button>
                    <button type='button' onClick={() => setEditingExpense(null)}>Cancel</button>
                </fieldset>
            </form>
            )}
        </div>
    )
}

export default ExpenseUpdate;
