import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // GET TASKS
  const fetchTasks = async () => {
  try {
    setLoading(true);

    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
    setLoading(false);

  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div  style={{
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  borderRadius: "12px",
  background: "#f4f6f8",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontFamily: "Arial"
}}>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h2 style={{ color: "#333" }}>✨ Task Dashboard</h2>

  <button
    onClick={logout}
    style={{
      background: "#ff4d4f",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>
</div>

      <br /><br />
<div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
  <input
    value={title}
    placeholder="Enter task"
    onChange={(e) => setTitle(e.target.value)}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    }}
  />

  <button
    onClick={addTask}
    style={{
      background: "#1890ff",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Add Task
  </button>
</div>

      <hr />
{loading ? (
  <p>Loading tasks...</p>
) : tasks.length === 0 ? (
  <p>No tasks found. Add your first task 🚀</p>
) : (
  <>
    {tasks.map((task) => (
      <div
        key={task._id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "white"
        }}
      >
        <span style={{ fontWeight: "500" }}>{task.title}</span>

        <button
          onClick={() => deleteTask(task._id)}
          style={{
            background: "#ff7875",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    ))}
  </>
)}
</div>
  );
}
export default Dashboard;