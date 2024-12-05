import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import MonthFilter from './components/MonthFilter';  //test
import TotalFilter from './components/TotalFilter';  //test
import ExpenseUpdate from './components/ExpenseUpdate';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectMonth, setSelectMonth] = useState(''); //test
  const [selectCategory, setSelectCategory] = useState(''); //test
  const [editingExpense, setEditingExpense] = useState(null);

  const apiURL = 'http://localhost:5000/expenses';

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(apiURL);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetrching expenses:', error);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(apiURL, {...newExpense, id: Date.now()});
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(apiURL + '/' + id);                                                                                                                                         
    const updateExpenses = expenses.filter(expense => expense.id === id);
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense', error)
    }
  };

  const handleEdit = (expense) => {                         // 수정할 항목 설정
    setEditingExpense(expense); 
  };

  const handleUpdateExpense = async (updatedExpense) => {   
    try {
      const response =  await axios.put(apiURL + '/' + updatedExpense.id, updatedExpense)
      const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? response.data : expense);
      setExpenses(updatedExpenses);               // axios.put 사용해 json-server 업데이트
      setEditingExpense(null);                    // Edit Expense Form 초기화
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    console.log('Updated expenses:', expenses)
  }, [expenses]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>지출 장부 프로그램</h1>
      
      <table border="1" style={{borderCollapse: 'collapse', width: '100%'}}>

        <caption><h2>Expense List</h2></caption>

        <thead style={{background: 'lightgray'}}>
          <th  style={{width: '10%'}}>
            날짜<br/>
            <select id='month_select' value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)}>
              <option value=''>전체</option>
              <option value='1'>1월</option>
              <option value='2'>2월</option>
              <option value='3'>3월</option>
              <option value='4'>4월</option>
              <option value='5'>5월</option>
              <option value='6'>6월</option>
              <option value='7'>7월</option>
              <option value='8'>8월</option>
              <option value='9'>9월</option>
              <option value='10'>10월</option>
              <option value='11'>11월</option>
              <option value='12'>12월</option>
            </select>
          </th><th style={{width: '10%'}}>분류<br/>
            <select id='category_select' value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)}>
              <option value="">전체</option>
              <option value="식비">식비</option>
              <option value="통신비">통신비</option>
              <option value="의료비">의료비</option>
              <option value="취미생활">취미생활</option>
              <option value="보험료">보험료</option>
            </select>
          </th><th>사용처</th><th style={{width: '20%'}}>금액</th><th style={{width: '5%'}}>수정</th><th style={{width: '5%'}}>삭제</th>
        </thead>

        <tbody>
          <MonthFilter 
            expenses={expenses} 
            selectMonth={selectMonth}
            selectCategory={selectCategory}
            deleteExpense={deleteExpense}
            handleEdit={handleEdit}  />
        </tbody>

        <tfoot style={{background: 'lightgray'}}>
        <tr><th></th><th></th><th>Total</th><th>$ <TotalFilter expenses={expenses} selectMonth={selectMonth} selectCategory={selectCategory}/></th><th></th><th></th></tr>
        </tfoot>

      </table>
      
      <br/>
      <hr/>

      <ExpenseForm addExpense={addExpense} />
      <ExpenseUpdate 
        editingExpense={editingExpense} 
        setEditingExpense={setEditingExpense}
        updateExpense={handleUpdateExpense} />
    </div>
  );
}

export default App;
