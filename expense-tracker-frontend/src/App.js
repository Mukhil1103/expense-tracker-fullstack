import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const API_URL = "https://expense-tracker-fullstack-1-ikle.onrender.com/api/expenses/";

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

 const addExpense = async () => {
  await axios.post(API_URL, {
    title: title,
    amount: Number(amount),
    date: date
    
  });

  clearForm();
  fetchExpenses();
};

const updateExpense = async () => {
  await axios.put(`${API_URL}${editingId}/`, {
    title: title,
    amount: Number(amount),
    date: date
    });

  clearForm();
  fetchExpenses();
};

  const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchExpenses();
  };

  const editExpense = (expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDate(expense.date);
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setDate("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Expense Tracker Dashboard</h1>

      <div style={styles.card}>

        <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {editingId ? (
          <button style={styles.button} onClick={updateExpense}>
            Update Expense
          </button>
        ) : (
          <button style={styles.button} onClick={addExpense}>
            Add Expense
          </button>
        )}

      </div>

      <div style={styles.grid}>

        {expenses.map((expense) => (

          <div key={expense.id} style={styles.expenseCard}>

            <h3>{expense.title}</h3>
            <p>₹{expense.amount}</p>
            <p>{expense.date}</p>

            <div style={{display:"flex", gap:"10px"}}>

              <button
                style={styles.editBtn}
                onClick={() => editExpense(expense)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {
  container:{
    padding:"40px",
    fontFamily:"Arial",
    background:"#f4f6f8",
    minHeight:"100vh"
  },

  title:{
    textAlign:"center",
    marginBottom:"30px"
  },

  card:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    marginBottom:"30px",
    boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
  },

  input:{
    display:"block",
    marginBottom:"10px",
    padding:"10px",
    width:"100%"
  },

  button:{
    padding:"10px 20px",
    background:"#4CAF50",
    color:"white",
    border:"none",
    cursor:"pointer"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
    gap:"20px"
  },

  expenseCard:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
  },

  editBtn:{
    background:"#2196F3",
    color:"white",
    border:"none",
    padding:"6px 10px",
    cursor:"pointer"
  },

  deleteBtn:{
    background:"#f44336",
    color:"white",
    border:"none",
    padding:"6px 10px",
    cursor:"pointer"
  }
};

export default App;